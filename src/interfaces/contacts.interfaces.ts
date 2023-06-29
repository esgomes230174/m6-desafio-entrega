import { DeepPartial, InsertResult, Repository } from "typeorm";
import { z } from "zod";
import { Contact } from "../entities";
import {
	contactsSchema,
	contactsCreateSchema,
	contactsWithoutPassSchema,
} from "../schemas/contacts.schemas";

type iContacts = z.infer<typeof contactsSchema>;
type iContactsWithOutPass = z.infer<typeof contactsWithoutPassSchema>;
type iContactsCreate = z.infer<typeof contactsCreateSchema>;
type iContactsRepo = Repository<Contact>;
type iContactsPartial = DeepPartial<Contact>;

export {
	iContacts,
	iContactsWithOutPass,
	iContactsCreate,
	iContactsRepo,
	iContactsPartial,
};
