import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";


export default mongoose.model(
  "Favorite",
  mongoose.Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },

      mediaType: { type: String, enum: ["movie", "tv"], required: true },
      mdeiaId: { type: String, required: true },
      mediaTitle: { type: String, required: true },
      mediPoster: { type: String, required: true },
      mdeiaRate: { type: Number, required: true },
    },
    modelOptions
  )
);
