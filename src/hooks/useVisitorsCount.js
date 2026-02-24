import { useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation",
};

export default function useVisitorCount() {
    const [count, setCount] = useState(null);

    useEffect(() => {
        // Evita contar visitas en localhost (desarrollo)
        if (window.location.hostname === "localhost") {
            setCount("—");
            return;
        }

        async function increment() {
            try {
                // 1. Obtener el valor actual
                const getRes = await fetch(
                    `${SUPABASE_URL}/rest/v1/visitors?id=eq.1&select=count`,
                    { headers: HEADERS }
                );
                const [row] = await getRes.json();
                const current = row?.count ?? 0;

                // 2. Incrementar en 1
                await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1`, {
                    method: "PATCH",
                    headers: HEADERS,
                    body: JSON.stringify({ count: current + 1 }),
                });

                setCount(current + 1);
            } catch {
                setCount(null);
            }
        }

        increment();
    }, []);

    return count;
}