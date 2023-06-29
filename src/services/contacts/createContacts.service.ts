import { AppDataSource } from "../../data-source";
import { Client, Contact } from "../../entities";
import { AppError } from "../../errors";
import { iClientsRepo } from "../../interfaces/clients.interfaces";
import {
	iContactsCreate,
	iContactsRepo,
	iContactsWithOutPass,
} from "../../interfaces/contacts.interfaces";
import { clientsWithoutPassSchema } from "../../schemas/clients.schemas";
import { contactsWithoutPassSchema } from "../../schemas/contacts.schemas";

const createContactsService = async (
	payload: iContactsCreate,
	clientId: number
): Promise<iContactsWithOutPass> => {
	const contactsRepo: iContactsRepo = AppDataSource.getRepository(Contact),
		clientRepo: iClientsRepo = AppDataSource.getRepository(Client);

	const client = await clientRepo.findOneBy({ id: clientId });

	if (!client) {
		throw new AppError("Client not found", 404);
	}

	const checkEmail = await contactsRepo
		.createQueryBuilder()
		.select()
		.where("email = :email", { email: payload.email })
		.getOne();

	if (checkEmail) {
		throw new AppError("Email already exists", 409);
	}

	const contact: Contact = contactsRepo.create({
		...payload,
		client,
	});

	await contactsRepo.save(contact);

	const resContact = contactsWithoutPassSchema.parse(contact);

	return resContact;
};

export default createContactsService;
