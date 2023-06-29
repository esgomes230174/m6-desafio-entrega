import { DeepPartial, InsertResult, Repository } from "typeorm";
import { z } from "zod";
import { Client } from "../entities";
import {
	clientsSchema,
	clientsCreateSchema,
	clientsWithoutPassSchema,
} from "../schemas/clients.schemas";

type iClients = z.infer<typeof clientsSchema>;
type iClientsWithOutPass = z.infer<typeof clientsWithoutPassSchema>;
type iClientsCreate = z.infer<typeof clientsCreateSchema>;
type iClientsRepo = Repository<Client>;
type iClientsPartial = DeepPartial<Client>;

export {
	iClients,
	iClientsWithOutPass,
	iClientsCreate,
	iClientsRepo,
	iClientsPartial,
};
