import { Request, Response } from "express";
import { iContactsWithOutPass } from "../interfaces/contacts.interfaces";
import createContactsService from "../services/contacts/createContacts.service";
import deleteContactsService from "../services/contacts/deleteContacts.service";
import getAllContactsService from "../services/contacts/getAllContacts.service";
import updateContactsService from "../services/contacts/updateContacts.service";

const getAllContactsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const allContacts: iContactsWithOutPass[] = await getAllContactsService();

	return res.status(200).json(allContacts);
};

const createContactsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const payload: any = req.body,
		clientId: number = req.client.id;

	const contactData: iContactsWithOutPass = await createContactsService(
		payload,
		clientId
	);

	return res.status(201).json(contactData);
};

const updateContactsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const payload: any = req.body,
		contactId: number = parseInt(req.params.id);

	const updatedData: iContactsWithOutPass = await updateContactsService(
		payload,
		contactId
	);

	return res.status(200).json(updatedData);
};

const deleteContactsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const contactId: number = parseInt(req.params.id);

	await deleteContactsService(contactId);

	return res.status(204).send();
};

export {
	getAllContactsController,
	createContactsController,
	updateContactsController,
	deleteContactsController,
};
