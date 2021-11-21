import { NextFunction, Request, Response } from "express";

import User from "../models/Users";
import Market from "../models/Markets";
import IUsers from "../interfaces/IUsers";
import Farm from "../models/Farms";
import Barrack from "../models/Barracks";

class list {
    static async listUser(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const result = await User.findById(id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            res.status(200).json({
                message: "Data user berhasil ditampilkan",
                data: result,
            });
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async listMarketOwned(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userData } = req;
        try {
            if (userData) {
                const result = await User.findById(userData?.id)
                    .populate<IUsers>("market.resource")
                    .populate<IUsers>("farm.resource")
                    .populate<IUsers>("barrack.resource");
                res.status(200).json({
                    message: "Daftar market berhasil ditampilkan",
                    data: result.market,
                });
            } else {
                throw {
                    name: "Missing_Token",
                };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async listMarketOwnedSpecific(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userData } = req;
        const { market } = req.params;
        try {
            if (userData) {
                const result = await Market.findById(market);
                if (result) {
                    return res.status(200).json({
                        message: "Detail market berhasil ditampilkan",
                        data: result,
                    });
                } else {
                    throw { name: "ID_Not_Found" };
                }
            } else {
                throw {
                    name: "Missing_Token",
                };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async listFarmOwned(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userData } = req;
        try {
            if (userData) {
                const result = await User.findById(userData?.id)
                    .populate<IUsers>("market.resource")
                    .populate<IUsers>("farm.resource")
                    .populate<IUsers>("barrack.resource");
                res.status(200).json({
                    message: "Daftar Farm berhasil ditampilkan",
                    data: result.farm,
                });
            } else {
                throw {
                    name: "Missing_Token",
                };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async listFarmOwnedSpecific(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userData } = req;
        const { farm } = req.params;
        try {
            if (userData) {
                const result = await Farm.findById(farm);
                if (result) {
                    return res.status(200).json({
                        message: "Detail Farm berhasil ditampilkan",
                        data: result,
                    });
                } else {
                    throw { name: "ID_Not_Found" };
                }
            } else {
                throw {
                    name: "Missing_Token",
                };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async listBarrackOwned(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userData } = req;
        try {
            if (userData) {
                const result = await User.findById(userData?.id)
                    .populate<IUsers>("market.resource")
                    .populate<IUsers>("farm.resource")
                    .populate<IUsers>("barrack.resource");
                res.status(200).json({
                    message: "Daftar Barrack berhasil ditampilkan",
                    data: result.barrack,
                });
            } else {
                throw {
                    name: "Missing_Token",
                };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async listBarrackOwnedSpecific(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userData } = req;
        const { barrack } = req.params;
        try {
            if (userData) {
                const result = await Barrack.findById(barrack);
                if (result) {
                    return res.status(200).json({
                        message: "Detail Barrack berhasil ditampilkan",
                        data: result,
                    });
                } else {
                    throw { name: "ID_Not_Found" };
                }
            } else {
                throw {
                    name: "Missing_Token",
                };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }
}

export default list;
