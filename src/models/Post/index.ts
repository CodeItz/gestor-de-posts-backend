import { Document, Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

import { PostInterface } from "./IPost";

export interface ClientModelInterface extends PostInterface, Document {}

const PostSchema: Schema = new Schema(
  {
    clientId: ObjectId,
    subClientId: ObjectId,
    dateScheduled: Date,
    photoURL: String,
    description: {
      type: String,
      default: "open",
    },
    status: String,
  },
  { timestamps: true }
);

export default model<PostInterface>("Post", PostSchema);
