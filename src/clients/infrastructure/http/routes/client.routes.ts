import { Router } from "express";
import { CreateClientController } from "../controllers/create-client.controller";
import { getClientController } from "../controllers/get-client.controller";
import { listAllClientController } from "../controllers/listAll-client.controller";
import { deleteClientController } from "../controllers/delete-client.controller";
import { updateClientController } from "../controllers/update-client.controller";
import { getEmailClientController } from "../controllers/getEmail-client.controller";
import { AuthenticateClientController } from "../controllers/authenticate-client.controller";
import { isAuth } from "@/common/infrastructure/http/middlewares/isAuth";

const clientRouter = Router();

clientRouter.post("/", async (req, res) => {
  CreateClientController(req, res);
});

clientRouter.get("/", async (req, res) => {
  listAllClientController(req, res);
});

clientRouter.get("/:id", isAuth, async (req, res) => {
  getClientController(req, res);
});

clientRouter.get("/:email", isAuth, async (req, res) => {
  getEmailClientController(req, res);
});

clientRouter.put("/:id", isAuth, async (req, res) => {
  updateClientController(req, res);
});

clientRouter.delete("/:id", isAuth, async (req, res) => {
  deleteClientController(req, res);
});

clientRouter.post("/authentication", async (req, res) => {
  AuthenticateClientController(req, res);
});

export { clientRouter };
