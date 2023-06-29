import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { iContactsRepo } from "../../interfaces/contacts.interfaces";
import { contactsUpdateSchema } from "../../schemas/contacts.schemas";

const updateContactsService = async (
	payload: any,
	contactId: number
): Promise<any> => {
	const contactsRepo: iContactsRepo = AppDataSource.getRepository(Contact);

	await contactsRepo.update(
		{
			id: contactId,
		},
		{
			...payload,
		}
	);

	const updatedContact = await contactsRepo.findOneBy({ id: contactId });

	return contactsUpdateSchema.parse(updatedContact);
};

export default updateContactsService;
