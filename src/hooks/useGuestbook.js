import { useEffect, useState } from "react";
import { SUPABASE_URL, HEADERS } from "../lib/supabase";

export default function useGuestbook() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function fetchEntries() {
        try {
            const res = await fetch(
                `${SUPABASE_URL}/rest/v1/guestbook?select=*&order=created_at.desc&limit=20`,
                { headers: HEADERS }
            );
            const data = await res.json();
            setEntries(Array.isArray(data) ? data : []);
        } catch {
            setEntries([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchEntries(); }, []);

    async function submit({ name, message, country }) {
        if (window.location.hostname === "localhost") return;
        setSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/guestbook`, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify({ name, message, country }),
            });
            if (!res.ok) throw new Error();
            await fetchEntries();
            setSuccess(true);
        } catch {
            setError(true);
        } finally {
            setSubmitting(false);
        }
    }

    return { entries, loading, submitting, error, success, submit };
}