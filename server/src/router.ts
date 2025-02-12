import { Request, Router } from "express";
import seedrandom from "seedrandom";
import { generateBookBatch, Lang, randomizer } from "./generateBook";

const router = Router();

interface RequestParams {
  lang: Lang;
  page: string;
  like: string;
  review: string;
  seed: string;
}

function getParams(req: Request) {
  const query = req.query as unknown as RequestParams;

  const seed = isNaN(Number(query.seed)) ? 42 : Number(query.seed);
  const page = isNaN(Number(query.page)) ? 1 : Number(query.page);
  const like = isNaN(Number(query.like)) ? 3.5 : Number(query.like);
  const review = isNaN(Number(query.review)) ? 0.5 : Number(query.review);
  const lang = query.lang || "en";

  return { seed, page, like, review, lang };
}

function getRng(seed: number, page: number) {
  const finalseed = seed + page;
  randomizer.seed(finalseed);
  return seedrandom(finalseed.toString());
}

router.get("/", (req, res) => {
  const { seed, page, like, review, lang } = getParams(req);
  const rng = getRng(seed, page);

  const books = generateBookBatch(page, lang, like, review, rng);

  res.status(200).json(books);
});

export default router;
