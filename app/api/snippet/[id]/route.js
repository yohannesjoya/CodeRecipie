import { connectToDB } from "@utils/dbConfig";
import Snippet from "@models/snippet";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    //find all snippets
    const snippet = await Snippet.findById(params.id).populate("creator");
    if (!snippet) return new Response("No Snippet found", { status: 404 });
    return new Response(JSON.stringify(snippet), { status: 200 });
  } catch (error) {
    return new Response("Failed to get snippet", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { snippet, tags } = await req.json();

  // console.log(snippet, tags);
  try {
    await connectToDB();
    //! find the snippet that will be edited
    const existingSnippet = await Snippet.findById(params.id);

    if (!existingSnippet)
      return new Response("No Snippet found", { status: 404 });
    existingSnippet.snippetData = snippet;
    existingSnippet.tags = tags;

    await existingSnippet.save();

    return new Response(JSON.stringify(existingSnippet), { status: 200 });
  } catch (error) {
    return new Response("Failed to update snippet", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const existingSnippet = await Snippet.findByIdAndRemove(params.id);

    return new Response(JSON.stringify(existingSnippet), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete snippet", { status: 500 });
  }
};
