import { Router, Request, Response } from "express";
import multer from "multer";

import UploadFileController from "./controllers/UploadFile";

import SubClientController from "./controllers/SubClient";
import createSubClient from "./validations/SubClients/create";
import updateSubClient from "./validations/SubClients/create";

import createClient from "./validations/Clients/create";
import ClientController from "./controllers/Client";

import AuthMiddleware from "./middlewares/auth";
import AuthController from "./controllers/Auth";
import createAuth from "./validations/Auth/create";

import PostController from "./controllers/Post";
import createPost from "./validations/Post/create";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Its works the new Backend!" });
});

routes.post("/auth", createAuth, AuthController.store);

// rotas privadas
routes.use(AuthMiddleware);

routes.get("/subclients", SubClientController.index);
routes.post("/subclients", createSubClient, SubClientController.store);
routes.put("/subclients/:id", updateSubClient, SubClientController.update);
routes.get("/subclients/:id", SubClientController.show);

routes.get("/clients", ClientController.index);
routes.post("/clients", createClient, ClientController.store);
routes.get("/clients/:id", ClientController.show);

routes.get("/posts", PostController.index);
routes.post("/posts", createPost, PostController.store);
routes.get("/posts/:id", PostController.show);
routes.put("/posts/:id", createPost, PostController.update);

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

routes.post("/upload", uploader.any(), UploadFileController.store);

export default routes;
