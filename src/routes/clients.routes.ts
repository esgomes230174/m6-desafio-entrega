import { Router } from "express";
import {
	createClientsController,
	deleteClientsController,
	getAllClientsController,
	updateClientsController,
} from "../controllers/clients.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
	clientsCreateSchema,
	clientsUpdateSchema,
} from "../schemas/clients.schemas";
import ensureClientExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureIsOwnerMiddleware from "../middlewares/ensureIsOwner.middleware";

const clientsRoutes: Router = Router();

clientsRoutes.get("", ensureTokenIsValidMiddleware, getAllClientsController);
clientsRoutes.post(
	"",
	ensureDataIsValidMiddleware(clientsCreateSchema),
	createClientsController
);
clientsRoutes.patch(
	"/:id",
	ensureDataIsValidMiddleware(clientsUpdateSchema),
	ensureTokenIsValidMiddleware,
	ensureClientExistsMiddleware,
	ensureIsOwnerMiddleware,
	updateClientsController
);
clientsRoutes.delete(
	"/:id",
	ensureTokenIsValidMiddleware,
	ensureClientExistsMiddleware,
	ensureIsOwnerMiddleware,
	deleteClientsController
);

export default clientsRoutes;
