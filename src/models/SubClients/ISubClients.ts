import { ObjectId } from "mongoose";

export interface RedeInterface {
  name: string;
  user: string;
  password: string;
}

export interface SubClientsInterface {
  name: string;
  idClient: ObjectId;
  redes: Array<RedeInterface>;
  _update?: any;
}
