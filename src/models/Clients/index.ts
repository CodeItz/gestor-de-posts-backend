import { Document, Schema, model } from "mongoose";
import { encryptString } from "../../utils/Encrypt";

const ObjectId = Schema.Types.ObjectId;

import { ClientsInterface, AuthInterface } from "./IClients";

export interface ClientModelInterface extends ClientsInterface, Document {}

const ClientSchema: Schema = new Schema({
  name: String,
  blocked: Boolean,
  reason: String,
  auth: {
    email: String,
    password: String,
  },
  plano: {
    type: ObjectId,
    default: null,
  },
  clients: Array,
  createdAt: Date,
  updateAt: Date,
});

const encryptAuth = async (auth: AuthInterface): Promise<AuthInterface> => {
  auth.password = await encryptString(auth.password);

  return auth;
};

ClientSchema.pre<ClientsInterface>("save", async function (next) {
  this.auth = await encryptAuth(this.auth);
  next();
});

ClientSchema.pre<ClientsInterface>("updateOne", async function (next) {
  const { auth = {} } = this._update;

  this.auth = await encryptAuth(auth);
  next();
});

export default model<ClientsInterface>("Client", ClientSchema);
