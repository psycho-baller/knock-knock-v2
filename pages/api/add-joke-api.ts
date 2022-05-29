// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res
//       .status(405)
//       .json({ message: `${req.method} requests are not allowed` });
//   }
  try {
    const { setName, setEmail, jokeToAdd, typeOfJoke } = JSON.parse(req.body);
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_ADDITION_DB,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: setName,
              },
            },
          ],
        },
        Email: {
          email: setEmail,
        },
        Joke: {
          rich_text: [
            {
              text: {
                content: jokeToAdd,
              },
            },
          ],
        },
        "Type of Joke": {
          select: {
            name: typeOfJoke,
          },
        },
      },
    });
    res.status(201).json({ msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: "There was an error" });
  }
}
