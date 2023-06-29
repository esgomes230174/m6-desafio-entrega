import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureClientMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isClient = req.client.isClient,
		clientID = req.client.id;

	if (
		(req.method.toUpperCase() === "DELETE" ||
			req.method.toUpperCase() === "PATCH") &&
		clientID === parseInt(req.params.id)
	) {
		return next();
	}

	if (!isClient) {
		throw new AppError("Insufficient permission", 403);
	}

	return next();
};

export default ensureClientMiddleware;
