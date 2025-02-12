import { useState } from "react";
import { BookCard } from "./BookCard";
import { Book } from "./types";

interface Props {
  books: Book[];
  lastBookRef: (node: HTMLDivElement) => void;
}

export default function BooksList({ books, lastBookRef }: Props) {
  const [curr, setCurr] = useState<number | null>(null);

  return (
    <main className="container flex flex-col gap-1">
      {books.map((book, idx) => (
        <BookCard
          key={book.id}
          book={book}
          curr={curr}
          setCurr={setCurr}
          lastBookRef={idx === books.length - 1 ? lastBookRef : undefined}
        />
      ))}
    </main>
  );
}
