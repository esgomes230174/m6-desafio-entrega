import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../errors";
import {
	iClientsCreate,
	iClientsRepo,
	iClientsWithOutPass,
} from "../../interfaces/clients.interfaces";
import { clientsWithoutPassSchema } from "../../schemas/clients.schemas";

const createClientsService = async (
	payload: iClientsCreate
): Promise<iClientsWithOutPass> => {
	const clientsRepo: iClientsRepo = AppDataSource.getRepository(Client);

	const checkEmail = await clientsRepo
		.createQueryBuilder()
		.select()
		.where("email = :email", { email: payload.email })
		.getOne();

	if (checkEmail) {
		throw new AppError("Email already exists", 409);
	}

	const client: Client = clientsRepo.create(payload);

	await clientsRepo.save(client);

	const resClient = clientsWithoutPassSchema.parse(client);

	return resClient;
};

export default createClientsService;
