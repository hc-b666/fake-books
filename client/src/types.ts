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

export const langs: { short: Lang; long: string }[] = [
  { short: "en", long: "English" },
  { short: "pl", long: "Polish" },
  { short: "pt_BR", long: "Portuguese (Brazil)" },
];
