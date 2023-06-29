import { z } from "zod";

const clientsSchema = z.object({
	id: z.number(),
	name: z.string().min(3).max(45),
	email: z.string().email().max(45),
	phone: z.number(),
	password: z.string().min(4).max(120),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
});

const clientsWithoutPassSchema = clientsSchema.omit({ password: true });

const clientsCreateSchema = clientsSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
});

const clientsUpdateSchema = clientsWithoutPassSchema.partial();

export {
	clientsSchema,
	clientsWithoutPassSchema,
	clientsCreateSchema,
	clientsUpdateSchema,
};
