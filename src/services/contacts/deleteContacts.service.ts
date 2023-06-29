import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { iContactsRepo } from "../../interfaces/contacts.interfaces";

const deleteContactsService = async (contactId: number): Promise<void> => {
	const contactsRepo: iContactsRepo = AppDataSource.getRepository(Contact);

	await contactsRepo
		.createQueryBuilder()
		.softDelete()
		.where("id = :id", { id: contactId })
		.execute();
};

export default deleteContactsService;
