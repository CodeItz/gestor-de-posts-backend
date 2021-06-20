import { Document, Schema, model } from "mongoose";
import {encrypt } from "../../utils/Encrypt";

import { SubClientsInterface, RedeInterface } from "./ISubClients";

import Client from "../Clients/";

const ObjectId = Schema.Types.ObjectId;

export interface SubClientModelInterface
  extends SubClientsInterface,
    Document {}

const SubClientSchema: Schema = new Schema(
  {
    name: String,
    idClient: ObjectId,
    redes: {
      type: Array,
      default: [],
    },
    createdAt: Date,
    updateAt: Date,
  },
  { timestamps: true }
);

const encryptRedes = async (redes: RedeInterface[]) => {
  const redesCrypted: Array<RedeInterface> = await Promise.all(
    redes.map(async (item: RedeInterface): Promise<RedeInterface> => {
      const passwordCrypted = await encrypt(item.password);

      item.password = passwordCrypted;
      return item;
    })
  );

  return redesCrypted;
};

SubClientSchema.pre<SubClientsInterface>("save", async function (next) {
  const { redes = [], _id, idClient } = this;
  this.redes = await encryptRedes(redes);

  const client = await Client.findById(idClient);

  if (client) {
    client.clients = [...client.clients, _id];
    await client.updateOne(client);
  }

  next();
});

SubClientSchema.pre<SubClientsInterface>("updateOne", async function (next) {
  const { redes = [] } = this._update;
  this.redes = await encryptRedes(redes);
  next();
});

export default model<SubClientModelInterface>("SubClient", SubClientSchema);
