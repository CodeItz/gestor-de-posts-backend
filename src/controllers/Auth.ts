import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/JWT";
import Clients from "../models/Clients";

import { compare } from "../utils/Encrypt";

const ClientsController = {
  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const client = await Clients.findOne({ "auth.email": email });

      if (!client) {
        return res.status(401).json({ error: "Client not found" });
      }

      if (!(await compare(password, client.auth.password))) {
        return res.status(401).json({ error: "Password does not match" });
      }

      const id = client._id;

      const token = jwt.sign({ id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });

      return res.json({ data: { client, token } });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

export default ClientsController;
