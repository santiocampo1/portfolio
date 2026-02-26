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
    const [isMilestone, setIsMilestone] = useState(false);

    useEffect(() => {
        if (window.location.hostname === "localhost") {
            setCount("—");
            return;
        }

        async function increment() {
            try {
                const getRes = await fetch(
                    `${SUPABASE_URL}/rest/v1/visitors?id=eq.1&select=count`,
                    { headers: HEADERS }
                );
                const [row] = await getRes.json();
                const current = row?.count ?? 0;
                const next = current + 1;

                await fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1`, {
                    method: "PATCH",
                    headers: HEADERS,
                    body: JSON.stringify({ count: next }),
                });

                setCount(next);

                // Trigger celebration every 100 visits
                if (next % 100 === 0) setIsMilestone(true);
            } catch {
                setCount(null);
            }
        }

        increment();
    }, []);

    return { count, isMilestone, clearMilestone: () => setIsMilestone(false) };
}