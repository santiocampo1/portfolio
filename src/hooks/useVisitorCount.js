import { useEffect, useState } from "react";
import { SUPABASE_URL, HEADERS } from "../lib/supabase";

export default function useVisitorCount() {
    const [count, setCount] = useState(null);
    const [isMilestone, setIsMilestone] = useState(false);

    useEffect(() => {
        if (window.location.hostname === "localhost") {
            setCount("—");
            return;
        }

        const cached = sessionStorage.getItem("visited");
        if (cached) {
            setCount(Number(cached));
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
                sessionStorage.setItem("visited", next);
                if (next % 50 === 0) setIsMilestone(true);
            } catch {
                setCount(null);
            }
        }

        increment();
    }, []);

    return { count, isMilestone, clearMilestone: () => setIsMilestone(false) };
}