import { ObjectId } from "mongoose";

export interface AuthInterface {
  email: string;
  password: string;
}

export interface ClientsInterface {
  name: String;
  blocked: Boolean;
  reason: String;
  auth: AuthInterface;
  plano: ObjectId;
  _update?: any;
}
