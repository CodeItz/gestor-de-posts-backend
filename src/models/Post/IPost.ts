import { ObjectId } from "mongoose";

export interface PostInterface {
  clientId: ObjectId;
  subClientId: ObjectId;
  dateScheduled: Date;
  photoURL: String;
  description: String;
  status: String;
}
