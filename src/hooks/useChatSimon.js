import { useState } from "react";

const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-simon`;
const AUTH = `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`;
const TIMEOUT = 30_000;

const ERRORS = {
    es: { timeout: "Woof... tardé demasiado 🐾 Intentá de nuevo.", generic: "Woof... algo salió mal 🐾 Intentá de nuevo." },
    en: { timeout: "Woof... that took too long 🐾 Try again.", generic: "Woof... something went wrong 🐾 Try again." },
};

export function parseMarkdown(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/^- (.+)$/gm, "<span style='display:block;padding-left:0.75rem;position:relative'><span style='position:absolute;left:0'>·</span>$1</span>")
        .replace(/\n{2,}/g, "<br/><br/>")
        .replace(/\n/g, "<br/>");
}

export default function useChatSimon(lang) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function send(text) {
        if (!text?.trim() || loading) return;

        const next = [...messages, { role: "user", content: text.trim() }];
        setMessages(next);
        setLoading(true);

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT);

        try {
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: AUTH },
                body: JSON.stringify({ messages: next }),
                signal: controller.signal,
            });
            clearTimeout(timer);
            const { reply } = await res.json();
            setMessages(prev => [...prev, { role: "assistant", content: reply }]);
        } catch (err) {
            clearTimeout(timer);
            const errs = ERRORS[lang] ?? ERRORS.en;
            const content = err.name === "AbortError" ? errs.timeout : errs.generic;
            setMessages(prev => [...prev, { role: "assistant", content }]);
        } finally {
            setLoading(false);
        }
    }

    return { messages, loading, send };
}