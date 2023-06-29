import { Request, Response } from "express";
import { iClientsWithOutPass } from "../interfaces/clients.interfaces";
import createClientsService from "../services/clients/createClients.service";
import deleteClientsService from "../services/clients/deleteClients.service";
import getAllClientsService from "../services/clients/getAllClients.service";
import updateClientsService from "../services/clients/updateClients.service";

const getAllClientsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const allClients: iClientsWithOutPass[] = await getAllClientsService();

	return res.status(200).json(allClients);
};

const createClientsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const payload: any = req.body;

	const clientData: iClientsWithOutPass = await createClientsService(payload);

	return res.status(201).json(clientData);
};

const updateClientsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const payload: any = req.body,
		clientId: number = parseInt(req.params.id);

	const updatedData: iClientsWithOutPass = await updateClientsService(
		payload,
		clientId
	);

	return res.status(200).json(updatedData);
};

const deleteClientsController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const clientId: number = parseInt(req.params.id);

	await deleteClientsService(clientId);

	return res.status(204).send();
};

export {
	getAllClientsController,
	createClientsController,
	updateClientsController,
	deleteClientsController,
};
