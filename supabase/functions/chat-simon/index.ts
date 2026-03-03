import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SYSTEM_PROMPT_BASE } from "./prompt.ts"; 

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const SUPABASE_URL = Deno.env.get("PROJECT_URL");
const SUPABASE_ANON_KEY = Deno.env.get("PROJECT_ANON_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function fetchBooks(): Promise<string> {
    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/books?select=title,author,category&order=category.asc,sort_order.asc`,
            {
                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                },
            }
        );
        const books = await res.json();

        const grouped: Record<string, { title: string; author: string }[]> = {};
        for (const book of books) {
            if (!grouped[book.category]) grouped[book.category] = [];
            grouped[book.category].push(book);
        }

        const categoryLabels: Record<string, string> = {
            personal: "Personal Development",
            biography: "Biographies",
            technical: "Technical",
            other: "Other",
        };

        return Object.entries(grouped)
            .map(([cat, items]) => {
                const label = categoryLabels[cat] ?? cat;
                const lines = items.map(b => `- "${b.title}" by ${b.author}`).join("\n");
                return `${label}:\n${lines}`;
            })
            .join("\n\n");
    } catch {
        return "(books unavailable)";
    }
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { messages } = await req.json();

        const booksSection = await fetchBooks();
        const systemPrompt = SYSTEM_PROMPT_BASE.replace("{{BOOKS}}", booksSection);

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": ANTHROPIC_API_KEY!,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 600,
                system: systemPrompt,
                messages,
            }),
        });

        const data = await response.json();
        const text = data.content?.[0]?.text ?? "Woof... something went wrong 🐾";

        return new Response(JSON.stringify({ reply: text }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch {
        return new Response(JSON.stringify({ reply: "Woof... something went wrong 🐾" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});