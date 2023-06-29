import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import {
	iClients,
	iClientsRepo,
	iClientsWithOutPass,
} from "../../interfaces/clients.interfaces";
import { clientsWithoutPassSchema } from "../../schemas/clients.schemas";

const getAllClientsService = async (): Promise<iClientsWithOutPass[]> => {
	const clientsRepo: iClientsRepo = AppDataSource.getRepository(Client);

	const clients: iClients[] = await clientsRepo.find();

	const allClientsWithOutPass = clientsWithoutPassSchema.array().parse(clients);

	return allClientsWithOutPass;
};

export default getAllClientsService;
