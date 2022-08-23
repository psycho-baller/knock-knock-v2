import React from "react";
import BoomBamBap from "../components/boom-bam-bap";
import Door from "../components/door";
import clientPromise from "../lib/mongodb";
import { jokeSchema } from "../utils/types";

// Jokes API:
// https://rapidapi.com/humorapi/api/humor-jokes-and-memes/tutorials/how-to-create-a-jokes-app-using-humor-jokes-and-memes-api-and-next-js
interface IndexProps {
  jokes: Array<jokeSchema>;
}

const Home = ({jokes}: IndexProps) => {

  const [ showJoke, setShowJoke ] = React.useState(false) as [ boolean, (showJoke: boolean) => void ];

  if (showJoke) {
    return(<BoomBamBap jokes={jokes}/>);
  } else {
  return (
    <Door showJoke={showJoke} setShowJoke={setShowJoke}/>
  );}
};

export default Home;

export async function getStaticProps(context: any) {
  const client = await clientPromise;

  const db = client.db("knock-knock");

  let jokes = await db.collection("jokes").find({}).toArray();
  jokes = JSON.parse(JSON.stringify(jokes));

  return {
    props: {
      jokes: jokes,
    },
  };
}
