const Fuse = require("fuse.js");
import type { NextApiRequest, NextApiResponse } from "next";
const data = require("../../script/output.json");

type Data = {
  name: string;
};

export default function search(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let word = req.query.q;
  let arr: any = Object.keys(data).map((k) => data[k]);
  const options = {
    keys: ["count", "word"],
  };
  const fuse = new Fuse(arr, options);
  let words = fuse.search(word).slice(0, 10);

  res.setHeader("Cache-Control", "s-maxage=1440000");
  res.status(200).json(words);
}
