import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { iClientsRepo } from "../../interfaces/clients.interfaces";

const deleteClientsService = async (clientId: number): Promise<void> => {
	const clientsRepo: iClientsRepo = AppDataSource.getRepository(Client);

	await clientsRepo
		.createQueryBuilder()
		.softDelete()
		.where("id = :id", { id: clientId })
		.execute();
};

export default deleteClientsService;
