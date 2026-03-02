import Reveal from "../ui/Reveal";
import useBooks from "../../hooks/useBooks";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

const CATEGORY_COLORS = {
    personal: { bg: "#EFF3FF", border: "#c7d7fa", text: "#1D4ED8" },
    biography: { bg: "#FFF7ED", border: "#fed7aa", text: "#C2410C" },
    technical: { bg: "#F0FDF4", border: "#86efac", text: "#16A34A" },
    other: { bg: "#F5F3FF", border: "#ddd6fe", text: "#7C3AED" },
};

const CATEGORY_ORDER = ["personal", "biography", "technical", "other"];

function BookCover({ title, author, category }) {
    const encoded = encodeURIComponent(title);
    const coverUrl = `https://covers.openlibrary.org/b/title/${encoded}-M.jpg`;
    const colors = CATEGORY_COLORS[category];

    return (
        <div style={{
            width: "100%",
            aspectRatio: "2 / 3",
            borderRadius: "6px",
            overflow: "hidden",
            border: `1px solid ${colors.border}`,
            background: colors.bg,
            flexShrink: 0,
            position: "relative",
        }}>
            <img
                src={coverUrl}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={e => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "flex";
                }}
            />
            {/* Fallback */}
            <div style={{
                display: "none",
                width: "100%", height: "100%",
                position: "absolute", inset: 0,
                background: colors.bg,
                flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "0.75rem",
                textAlign: "center",
                gap: "0.4rem",
            }}>
                <span style={{ fontSize: "1.5rem" }}>📖</span>
                <p style={{ ...sans, fontSize: "0.65rem", fontWeight: 600, color: colors.text, lineHeight: 1.3 }}>
                    {title}
                </p>
                <p style={{ ...mono, fontSize: "0.55rem", color: colors.text, opacity: 0.7 }}>
                    {author}
                </p>
            </div>
        </div>
    );
}

function BookCard({ book, category }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <BookCover title={book.title} author={book.author} category={category} />
            <div>
                <p style={{ ...sans, fontWeight: 600, fontSize: "0.78rem", color: "var(--text)", lineHeight: 1.35 }}>
                    {book.title}
                </p>
                <p style={{ ...mono, fontSize: "0.58rem", color: "var(--text-4)", letterSpacing: "0.03em", marginTop: "2px" }}>
                    {book.author}
                </p>
            </div>
        </div>
    );
}

function CategorySection({ categoryKey, books, t }) {
    const colors = CATEGORY_COLORS[categoryKey];
    if (!books?.length) return null;

    return (
        <Reveal>
            <div style={{ marginBottom: "2.5rem" }}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "20px",
                    padding: "4px 12px",
                    marginBottom: "1.25rem",
                }}>
                    <span style={{ ...mono, fontSize: "0.6rem", color: colors.text, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                        {t.books.categories[categoryKey]}
                    </span>
                    <span style={{ ...mono, fontSize: "0.58rem", color: colors.text, opacity: 0.7 }}>
                        · {books.length}
                    </span>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                    gap: "1.25rem",
                }}>
                    {books.map((book, i) => (
                        <Reveal key={book.id} delay={i * 0.04}>
                            <BookCard book={book} category={categoryKey} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </Reveal>
    );
}

export default function Books({ t }) {
    const { books, loading } = useBooks();
    const b = t.books;

    return (
        <section id="books" className="section">
            <div className="section-inner">
                <Reveal>
                    <p className="section-eyebrow">{b.eyebrow}</p>
                    <h2 className="section-title">{b.title}</h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 500 }}>
                        {b.description}
                    </p>
                </Reveal>

                {loading ? (
                    <p style={{ ...mono, fontSize: "0.65rem", color: "var(--text-4)", letterSpacing: "0.06em" }}>
                        {b.loading}
                    </p>
                ) : (
                    CATEGORY_ORDER.map(key => (
                        <CategorySection
                            key={key}
                            categoryKey={key}
                            books={books[key]}
                            t={t}
                        />
                    ))
                )}
            </div>
        </section>
    );
}