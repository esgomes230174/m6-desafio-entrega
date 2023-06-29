import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import {
	iContacts,
	iContactsRepo,
	iContactsWithOutPass,
} from "../../interfaces/contacts.interfaces";
import { contactsWithoutPassSchema } from "../../schemas/contacts.schemas";

const getAllContactsService = async (): Promise<iContactsWithOutPass[]> => {
	const contactsRepo: iContactsRepo = AppDataSource.getRepository(Contact);

	const contacts: Contact[] = await contactsRepo.find();

	console.log(contacts);

	const allContactsWithOutPass = contactsWithoutPassSchema
		.array()
		.parse(contacts);

	return allContactsWithOutPass;
};

export default getAllContactsService;
