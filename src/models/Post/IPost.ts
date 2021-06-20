import { ObjectId } from "mongoose";

export interface PostInterface {
  clientId: ObjectId;
  subClientId: ObjectId;
  dateScheduled: Date;
  hourScheduled: String;
  photoURL: String;
  description: String;
  status: String;
}
