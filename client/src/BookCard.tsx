import { useState, useRef, useEffect } from "react";
import { Book } from "@/types";
import { ArrowDown } from "@/icons/ArrowDown";
import { ThumbsUp } from "@/icons/ThumbsUp";

interface Props {
  book: Book;
  curr: number | null;
  setCurr: (id: number | null) => void;
  lastBookRef?: (node: HTMLDivElement) => void;
}

export function BookCard({ book, curr, setCurr, lastBookRef }: Props) {
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const shorten = (str: string) => {
    const authors = str.split(" ");
    return `${authors[0]} ${authors
      .slice(1)
      .map((a) => a[0] + ".")
      .join(" ")}`;
  };

  const handleBookClick = () => {
    if (curr === book.id) setCurr(null);
    else setCurr(book.id);
  };

  useEffect(() => {
    if (curr === book.id) setHeight(`${contentRef.current?.scrollHeight}px`);
    else setHeight("0px");
  }, [curr, book.id]);

  return (
    <>
      <div
        ref={lastBookRef}
        onClick={handleBookClick}
        className="w-full py-2 border-b cursor-pointer"
      >
        <div className="w-full grid grid-cols-10 gap-4">
          <div className="col-span-1 flex items-center gap-2">
            {curr === book.id ? (
              <ArrowDown w={20} h={20} className="transform rotate-180" />
            ) : (
              <ArrowDown w={20} h={20} />
            )}
            <span>{book.id}</span>
          </div>
          <div className="col-span-9 grid grid-cols-4 gap-4">
            <div className="cols-span-1">{book.isbn}</div>
            <div className="cols-span-1">
              {book.title.length > 30
                ? book.title.slice(0, 30) + "..."
                : book.title}
            </div>
            <div className="cols-span-1">
              {book.authors.map((a) => shorten(a)).join(", ")}
            </div>
            <div className="cols-span-1">{book.publisher}</div>
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden duration-500 ease-in-out"
      >
        <div className="w-full bg-sky-50 py-5 px-10 rounded flex gap-10">
          <div className="flex flex-col items-center gap-1">
            <div className="w-[80px] h-[120px] rounded bg-blue-300"></div>
            <div className="flex items-center gap-1 text-blue-500">
              <ThumbsUp w={16} h={16} /> {book.likes}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <h2 className="text-xl font-bold">{book.title}</h2>
            </div>
            <h4 className="font-semibold">
              by <span className="italic">{book.authors.join(", ")}</span>
            </h4>
            <h3 className="text-base font-semibold text-gray-500">
              {book.publisher}
            </h3>
            <h2 className="text-lg font-semibold">Review</h2>
            <div className="flex flex-col gap-1">
              {book.reviews && book.reviews.length > 0 ? (
                book.reviews.map((r, i) => <p key={i}>- {r}</p>)
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
