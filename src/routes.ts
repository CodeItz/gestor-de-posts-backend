import { Router, Request, Response } from "express";
import multer from "multer";
import UploadFileController from "./controllers/UploadFile";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Its works the new Backend!" });
});

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

routes.post("/upload", uploader.any(), UploadFileController.store);

export default routes;
