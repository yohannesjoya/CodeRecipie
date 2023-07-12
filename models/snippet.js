import { Schema, model, models } from "mongoose";

const snippetSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  snippetData: {
    type: String,
    required: [true, "Code Snippet is required!"],
  },
  tags: {
    type: String,
    required: [true, "Tag is required!"],
  },
  screenshotImages: {
    type: String,
    required: [true, "Screenshots are required!"],
  },
});

const Snippet = models.Snippet || model("Snippet", snippetSchema);

export default Snippet;
