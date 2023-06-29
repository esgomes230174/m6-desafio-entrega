import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";

const ensureDataIsValidMiddleware =
	(schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
		if (!Object.keys(req.body).length) {
			throw new AppError("Missing object data", 400);
		}

		const validatedData = schema.parse(req.body);

		req.body = validatedData;

		return next();
	};

export default ensureDataIsValidMiddleware;
