import {
  en,
  Faker,
  generateMersenne53Randomizer,
  pl,
  pt_BR,
  Randomizer,
} from "@faker-js/faker";
import seedrandom from "seedrandom";

export const randomizer: Randomizer = generateMersenne53Randomizer();

const bookEnFaker = new Faker({
  locale: en,
  randomizer,
});

const bookPlFaker = new Faker({
  locale: pl,
  randomizer,
});

const bookPtBrFaker = new Faker({
  locale: pt_BR,
  randomizer,
});

export type Book = {
  id: number;
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  likes: number;
  reviews: string[];
};

export type Lang = "en" | "pl" | "pt_BR";

export function generateBook(
  id: number,
  lang: Lang,
  like: number,
  review: number,
  rng: seedrandom.PRNG
): Book {
  let bookFaker: Faker;

  switch (lang) {
    case "en":
      bookFaker = bookEnFaker;
      break;
    case "pl":
      bookFaker = bookPlFaker;
      break;
    case "pt_BR":
      bookFaker = bookPtBrFaker;
      break;
    default:
      bookFaker = bookEnFaker;
  }

  const title = bookFaker.book.title();
  const authorCount = bookFaker.number.int({ min: 1, max: 2 });
  const authors = Array.from({ length: authorCount }, () =>
    bookFaker.book.author()
  );
  const publisher = bookFaker.book.publisher();
  const isbn = bookFaker.commerce.isbn();
  const likes = Math.floor(like) + (rng() < like % 1 ? 1 : 0);
  const reviesCount = Math.floor(review) + (rng() < review % 1 ? 1 : 0);

  const reviews = Array.from({ length: reviesCount }, () =>
    bookFaker.lorem.sentence()
  );

  return { id, isbn, title, authors, publisher, likes, reviews };
}

export function generateBookBatch(
  page: number,
  lang: Lang,
  like: number,
  review: number,
  rng: seedrandom.PRNG
): Book[] {
  const startIndex = (page - 1) * 10 + 1;
  return Array.from({ length: 10 }, (_, i) =>
    generateBook(i + startIndex, lang, like, review, rng)
  );
}
