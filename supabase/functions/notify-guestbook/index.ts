import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const TO_EMAIL = "sanntiocampo@gmail.com";

serve(async (req) => {
    try {
        const payload = await req.json();
        const record = payload.record;

        const flag = record.country
            ? `(${record.country})`
            : "";

        const html = `
      <div style="font-family: monospace; max-width: 480px; padding: 24px; border: 1px solid #e8e8e5; border-radius: 8px;">
        <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #888; margin: 0 0 16px;">
          ✦ Nuevo mensaje en el Guestbook
        </p>
        <p style="font-size: 20px; font-weight: 700; color: #111; margin: 0 0 4px;">
          ${record.name} ${flag}
        </p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 20px; padding: 12px 16px; background: #f6f6f4; border-radius: 6px;">
          "${record.message}"
        </p>
        <p style="font-size: 11px; color: #bbb; margin: 0;">
          ${new Date(record.created_at).toLocaleString("es-AR")}
        </p>
        <a href="https://supabase.com/dashboard/project/zizgngundfrkcxcpddnq/editor" 
           style="display: inline-block; margin-top: 16px; font-size: 11px; color: #1D4ED8; text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase;">
          Ver en Supabase →
        </a>
      </div>
    `;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Guestbook <onboarding@resend.dev>",
                to: [TO_EMAIL],
                subject: `💬 ${record.name} dejó un mensaje en tu portfolio`,
                html,
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            return new Response(err, { status: 500 });
        }

        return new Response("ok", { status: 200 });
    } catch (e) {
        return new Response(String(e), { status: 500 });
    }
});