import { Request, Response } from "express";
import SubClients from "../models/SubClients";

const SubClientsController = {
  async index(req: Request, res: Response) {
    try {
      const subClients = await SubClients.find();
      return res.json({ data: subClients });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const subClient = await SubClients.findById(id);
      return res.json({ data: subClient });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async store(req: Request, res: Response) {
    try {
      const subClient = await SubClients.create(req.body);
      return res.json({ data: subClient });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const subClient = await SubClients.findById(id);

      if (!subClient) {
        return res.status(404).json({
          message: "SubClient not found",
        });
      }

      const subClientUpdated = await subClient.updateOne(req.body);
      return res.json({ data: subClientUpdated });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

export default SubClientsController;
