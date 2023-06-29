import { Router } from "express";
import {
	createContactsController,
	deleteContactsController,
	getAllContactsController,
	updateContactsController,
} from "../controllers/contacts.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureClientExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureClientMiddleware from "../middlewares/ensureClient.middleware";
import {
	contactsCreateSchema,
	contactsUpdateSchema,
} from "../schemas/contacts.schemas";

const contactsRoutes: Router = Router();

contactsRoutes.get(
	"",
	ensureTokenIsValidMiddleware,
	ensureClientMiddleware,
	getAllContactsController
);
contactsRoutes.post(
	"",
	ensureDataIsValidMiddleware(contactsCreateSchema),
	ensureClientMiddleware,
	createContactsController
);
contactsRoutes.patch(
	"/:id",
	ensureDataIsValidMiddleware(contactsUpdateSchema),
	ensureTokenIsValidMiddleware,
	ensureClientExistsMiddleware,
	ensureClientMiddleware,
	updateContactsController
);
contactsRoutes.delete(
	"/:id",
	ensureTokenIsValidMiddleware,
	ensureClientExistsMiddleware,
	ensureClientMiddleware,
	deleteContactsController
);

export default contactsRoutes;
