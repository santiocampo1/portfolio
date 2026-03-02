import { useEffect, useState } from "react";
import { SUPABASE_URL, HEADERS } from "../lib/supabase";

export default function useBooks() {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const res = await fetch(
                    `${SUPABASE_URL}/rest/v1/books?select=*&order=category.asc,sort_order.asc`,
                    { headers: HEADERS }
                );
                const data = await res.json();

                // Group by category
                const grouped = { personal: [], biography: [], technical: [], other: [] };
                for (const book of data) {
                    if (grouped[book.category]) grouped[book.category].push(book);
                }
                setBooks(grouped);
            } catch {
                setBooks({ personal: [], biography: [], technical: [], other: [] });
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, []);

    return { books, loading };
}