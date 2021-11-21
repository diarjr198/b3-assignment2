import jwt, { VerifyErrors } from "jsonwebtoken";
import fs from "fs";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            userData?: Record<string, any>;
        }
    }
}

class authJwt {
    static authentication(req: Request, res: Response, next: NextFunction) {
        const { cookies } = req;
        if ("access_token" in cookies) {
            console.log("Access Token Exists");
            const publicKey = fs.readFileSync("./keys/private.key", "utf-8");
            jwt.verify(
                cookies.access_token,
                publicKey,
                (err: VerifyErrors | null, decoded: object | undefined) => {
                    if (err) {
                        if (err.name === "TokenExpiredError") {
                            res.clearCookie("access_token");
                        }
                        next(err);
                    }
                    req.userData = decoded;
                }
            );
        } else {
            console.log("Access Token Missing");
        }
        next();
    }
}

export default authJwt;
