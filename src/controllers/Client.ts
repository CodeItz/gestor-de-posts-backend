import { Request, Response } from "express";
import Clients from "../models/Clients";

const ClientsController = {
  async index(req: Request, res: Response) {
    try {
      const clients = await Clients.find();
      return res.json({ data: clients });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Clients.findById(id);

      if (!client) {
        return res.status(404).json({
          message: "Client not found",
        });
      }

      return res.json({ data: client });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async store(req: Request, res: Response) {
    try {
      const { auth } = req.body;

      const client = await Clients.findOne({ "auth.email": auth.email });

      if (client) {
        return res.status(401).json({
          message: "Already registered",
        });
      }

      const clientStore = await Clients.create(req.body);
      return res.json({ data: clientStore });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

export default ClientsController;
