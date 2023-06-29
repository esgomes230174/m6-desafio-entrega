import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";
import { AppError } from "../errors";
import { iClientsRepo } from "../interfaces/clients.interfaces";

const ensureClientExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const clientId = parseInt(req.params.id);

	const clientsRepo: iClientsRepo = AppDataSource.getRepository(Client);

	const client = await clientsRepo.findOne({
		where: { id: clientId },
		withDeleted: true,
	});

	if (!client || client?.deletedAt) {
		throw new AppError("Client not found", 404);
	}

	return next();
};

export default ensureClientExistsMiddleware;
