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
    },
    status: {
      type: String,
      default: "open",
    },
  },
  { timestamps: true }
);

export default model<PostInterface>("Post", PostSchema);
