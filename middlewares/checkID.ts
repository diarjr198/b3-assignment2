import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
}

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { userData } = req;
        if (!userData) {
            throw { name: "Missing_Token" };
        }
        if (id === userData?.id) {
            next();
        } else {
            throw {
                name: "ID_NOT_PASS",
            };
        }
    } catch (error) {
        next(error);
    }
};
