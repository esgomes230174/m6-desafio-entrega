import { z } from "zod";

const contactsSchema = z.object({
	id: z.number(),
	name: z.string().min(3).max(45),
	email: z.string().email().max(45),
	phone: z.number(),
	password: z.string().min(4).max(120),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),

	clientId: z.number(),
});

const contactsWithoutPassSchema = contactsSchema.omit({ password: true });

const contactsCreateSchema = contactsSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
	clientId: true,
});

const contactsUpdateSchema = contactsWithoutPassSchema.partial();

export {
	contactsSchema,
	contactsWithoutPassSchema,
	contactsCreateSchema,
	contactsUpdateSchema,
};
