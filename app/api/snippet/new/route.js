import Snippet from "@models/snippet";
import { connectToDB } from "@utils/dbConfig";

export const POST = async (req) => {
  const { snippet, tags, userId, postImageUrls } = await req.json();

  try {
    await connectToDB();

    const newSnippet = new Snippet({
      creator: userId,
      snippetData: snippet,
      tags: tags,
      screenshotImages: postImageUrls,
    });
    await newSnippet.save();

    return new Response(JSON.stringify(newSnippet), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a snippet", { status: 500 });
  }
};
