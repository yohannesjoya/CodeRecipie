import { connectToDB } from "@utils/dbConfig";
import Snippet from "@models/snippet";

export const GET = async (req) => {
  try {
    await connectToDB();
    //find all snippets
    const snippets = await Snippet.find({}).populate("creator");
    return new Response(JSON.stringify(snippets), { status: 200 });
  } catch (error) {
    return new Response("Failed to get snippets", { status: 500 });
  }
};
