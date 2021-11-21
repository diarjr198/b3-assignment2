import { NextFunction, Request, Response } from "express";

import Market from "../models/Markets";
import Farm from "../models/Farms";
import Barrack from "../models/Barracks";

class updates {
    static async updateMarket(req: Request, res: Response, next: NextFunction) {
        const { market } = req.params;
        const { name } = req.body;
        try {
            const resultIdMarket = await Market.findById(market);
            const resultMarket = await Market.find({
                name: {
                    $in: name,
                },
            });
            if (resultIdMarket) {
                if (name) {
                    if (resultMarket.length < 1) {
                        const result = await Market.findByIdAndUpdate(
                            market,
                            {
                                name,
                            },
                            {
                                new: true,
                            }
                        );
                        res.status(200).json({
                            message: "Market berhasil diupdate",
                            data: result,
                        });
                    } else {
                        throw {
                            name: "Name_Used",
                        };
                    }
                } else {
                    throw { name: "Name_Null" };
                }
            } else {
                throw { name: "ID_Not_Found" };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async updateFarm(req: Request, res: Response, next: NextFunction) {
        const { farm } = req.params;
        const { name } = req.body;
        try {
            const resultIdFarm = await Farm.findById(farm);
            const resultFarm = await Farm.find({
                name: {
                    $in: name,
                },
            });
            if (resultIdFarm) {
                if (name) {
                    if (resultFarm.length < 1) {
                        const result = await Farm.findByIdAndUpdate(
                            farm,
                            {
                                name,
                            },
                            {
                                new: true,
                            }
                        );
                        res.status(200).json({
                            message: "Farm berhasil diupdate",
                            data: result,
                        });
                    } else {
                        throw {
                            name: "Name_Used",
                        };
                    }
                } else {
                    throw { name: "Name_Null" };
                }
            } else {
                throw { name: "ID_Not_Found" };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async updateBarrack(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { barrack } = req.params;
        const { name } = req.body;
        try {
            const resultIdBarrack = await Barrack.findById(barrack);
            const resultBarrack = await Barrack.find({
                name: {
                    $in: name,
                },
            });
            if (resultIdBarrack) {
                if (name) {
                    if (resultBarrack.length < 1) {
                        const result = await Barrack.findByIdAndUpdate(
                            barrack,
                            {
                                name,
                            },
                            {
                                new: true,
                            }
                        );
                        res.status(200).json({
                            message: "Barrack berhasil diupdate",
                            data: result,
                        });
                    } else {
                        throw {
                            name: "Name_Used",
                        };
                    }
                } else {
                    throw { name: "Name_Null" };
                }
            } else {
                throw { name: "ID_Not_Found" };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }
}

export default updates;
