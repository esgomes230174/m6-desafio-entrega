import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { iClientsRepo } from "../../interfaces/clients.interfaces";
import { clientsUpdateSchema } from "../../schemas/clients.schemas";

const updateClientsService = async (
	payload: any,
	clientId: number
): Promise<any> => {
	const clientsRepo: iClientsRepo = AppDataSource.getRepository(Client);

	await clientsRepo.update(
		{
			id: clientId,
		},
		{
			...payload,
		}
	);

	const updatedClient = await clientsRepo.findOneBy({ id: clientId });

	return clientsUpdateSchema.parse(updatedClient);
};

export default updateClientsService;
