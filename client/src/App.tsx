import { useCallback, useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "./constants";
import { Book, Lang, langs } from "./types";
import BooksList from "./BooksList";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState<Lang>("en");
  const [seed, setSeed] = useState(42);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useRef<HTMLDivElement | null>(null);

  const fetchBooks = useCallback(
    async (pageNum: number, reset: boolean = false) => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BACKEND_URL}?page=${pageNum}&lang=${lang}&seed=${seed}`
        );
        const data = (await res.json()) as Book[];
        setBooks((prevBooks) => (reset ? data : [...prevBooks, ...data]));
      } catch (err) {
        console.error("Error with fetching books: ", err);
      } finally {
        setLoading(false);
      }
    },
    [lang, seed]
  );

  const handleLanguageChange = async (newLang: Lang) => {
    setLang(newLang);
    setLoading(true);

    try {
      const booksPromises = Array.from({ length: page }, (_, i) =>
        fetch(`${BACKEND_URL}?page=${i + 1}&lang=${newLang}&seed=${seed}`).then(
          (res) => res.json()
        )
      );

      const allBooksData = await Promise.all(booksPromises);
      const flattenedBooks = allBooksData.flat() as Book[];
      setBooks(flattenedBooks);
    } catch (err) {
      console.error("Error fetching books for new language:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedChange = async (newSeed: number) => {
    setSeed(newSeed);
    setLoading(true);

    try {
      const booksPromises = Array.from({ length: page }, (_, i) =>
        fetch(`${BACKEND_URL}?page=${i + 1}&lang=${lang}&seed=${newSeed}`).then(
          (res) => res.json()
        )
      );

      const allBooksData = await Promise.all(booksPromises);
      const flattenedBooks = allBooksData.flat() as Book[];
      setBooks(flattenedBooks);
    } catch (err) {
      console.error("Error fetching books fow new language:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page, fetchBooks]);

  const lastBookRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage((p) => p + 1);
      });

      if (node) {
        observer.current.observe(node);
        lastBookElementRef.current = node;
      }
    },
    [loading]
  );

  useEffect(() => {
    return () => {
      if (observer.current && lastBookElementRef.current) {
        observer.current.unobserve(lastBookElementRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <nav className="container sticky top-0 w-full py-5 bg-sky-50 px-5 flex gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="lang">Default: English</label>
          <select
            id="lang"
            className="p-2 border rounded"
            value={lang}
            onChange={(e) => handleLanguageChange(e.target.value as Lang)}
            disabled={loading}
          >
            {langs.map((l) => (
              <option key={l.short} value={l.short}>
                {l.long}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="seed">Default: 42</label>
          <input
            id="seed"
            type="number"
            className="p-2 border rounded"
            value={seed}
            onChange={(e) => handleSeedChange(parseInt(e.target.value))}
          />
        </div>
      </nav>
      {loading && <div>Loading...</div>}
      <BooksList books={books} lastBookRef={lastBookRef} />
    </div>
  );
}

