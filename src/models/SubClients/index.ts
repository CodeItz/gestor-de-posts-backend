import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { SubClientsInterface, RedeInterface } from "./ISubClients";

const ObjectId = Schema.Types.ObjectId;

export interface SubClientModelInterface
  extends SubClientsInterface,
    Document {}

const SubClientSchema: Schema = new Schema({
  name: String,
  idClient: ObjectId,
  redes: {
    type: Array,
    default: [],
  },
  createdAt: Date,
  updateAt: Date,
});

const encryptRedes = async (redes: RedeInterface[]) => {
  const redesCrypted: Array<RedeInterface> = await Promise.all(
    redes.map(async (item: RedeInterface): Promise<RedeInterface> => {
      const passwordCrypted = await bcrypt.hash(item.password, 8);

      item.password = passwordCrypted;
      return item;
    })
  );

  return redesCrypted;
};

SubClientSchema.pre<SubClientsInterface>("save", async function (next) {
  const { redes = [] } = this;
  this.redes = await encryptRedes(redes);
  next();
});

SubClientSchema.pre<SubClientsInterface>("updateOne", async function (next) {
  const { redes = [] } = this._update;
  this.redes = await encryptRedes(redes);
  next();
});

export default model<SubClientModelInterface>("SubClient", SubClientSchema);
