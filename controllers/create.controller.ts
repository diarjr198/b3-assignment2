import User from "../models/Users";
import Market from "../models/Markets";
import { NextFunction, Request, Response } from "express";
import IUsers from "../interfaces/IUsers";
import Farm from "../models/Farms";
import Barrack from "../models/Barracks";

class creates {
    static async createMarket(req: Request, res: Response, next: NextFunction) {
        const { userData } = req;
        const { name } = req.body;
        try {
            if (name) {
                const resultUser = await User.findById(userData?.id);
                const { golds, foods } = resultUser!.townhall.resource;
                const resultMarket = await Market.find({
                    name: {
                        $in: name,
                    },
                });
                if (golds >= 30 && foods >= 10) {
                    if (resultUser!.market.amount >= 30) {
                        throw { name: "Amount_Full" };
                    }
                    if (resultMarket.length < 1) {
                        const resultCreate = await Market.create({
                            name,
                        });
                        const resultUserUpdate = await User.findByIdAndUpdate(
                            userData?.id,
                            {
                                $inc: {
                                    "market.amount": 1,
                                    "townhall.resource.golds": -30,
                                    "townhall.resource.foods": -10,
                                },
                                $push: {
                                    "market.resource": resultCreate.id,
                                },
                            },
                            {
                                new: true,
                            }
                        )
                            .populate<IUsers>("market.resource")
                            .populate<IUsers>("farm.resource")
                            .populate<IUsers>("barrack.resource");
                        return res.status(200).json({
                            message:
                                "Market berhasil dibuat, Golds dan Foods kamu berhasil dikurangi!",
                            data: resultCreate,
                            user: resultUserUpdate,
                        });
                    } else {
                        throw {
                            name: "Name_Used",
                        };
                    }
                } else {
                    throw {
                        name: "Not_Enough",
                    };
                }
            } else {
                throw { name: "Name_Null" };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async createFarm(req: Request, res: Response, next: NextFunction) {
        const { userData } = req;
        const { name } = req.body;
        try {
            if (name) {
                const resultUser = await User.findById(userData?.id);
                const { golds, foods } = resultUser!.townhall.resource;
                const resultFarm = await Farm.find({
                    name: {
                        $in: name,
                    },
                });
                if (golds >= 10 && foods >= 30) {
                    if (resultUser!.market.amount >= 30) {
                        throw { name: "Amount_Full" };
                    }
                    if (resultFarm.length < 1) {
                        const resultCreate = await Farm.create({
                            name,
                        });
                        const resultUserUpdate = await User.findByIdAndUpdate(
                            userData?.id,
                            {
                                $inc: {
                                    "farm.amount": 1,
                                    "townhall.resource.golds": -10,
                                    "townhall.resource.foods": -30,
                                },
                                $push: {
                                    "farm.resource": resultCreate.id,
                                },
                            },
                            {
                                new: true,
                            }
                        )
                            .populate<IUsers>("market.resource")
                            .populate<IUsers>("farm.resource")
                            .populate<IUsers>("barrack.resource");
                        return res.status(200).json({
                            message:
                                "Farm berhasil dibuat, Golds dan Foods kamu berhasil dikurangi!",
                            data: resultCreate,
                            user: resultUserUpdate,
                        });
                    } else {
                        throw {
                            name: "Name_Used",
                        };
                    }
                } else {
                    throw {
                        name: "Not_Enough",
                    };
                }
            } else {
                throw { name: "Name_Null" };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async createBarrack(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userData } = req;
        const { name } = req.body;
        try {
            if (name) {
                const resultUser = await User.findById(userData?.id);
                const { golds, foods } = resultUser!.townhall.resource;
                const resultBarrack = await Barrack.find({
                    name: {
                        $in: name,
                    },
                });
                if (golds >= 30 && foods >= 30) {
                    if (resultUser!.market.amount >= 30) {
                        throw { name: "Amount_Full" };
                    }
                    if (resultBarrack.length < 1) {
                        const resultCreate = await Barrack.create({
                            name,
                        });
                        const resultUserUpdate = await User.findByIdAndUpdate(
                            userData?.id,
                            {
                                $inc: {
                                    "barrack.amount": 1,
                                    "townhall.resource.golds": -30,
                                    "townhall.resource.foods": -30,
                                },
                                $push: {
                                    "barrack.resource": resultCreate.id,
                                },
                            },
                            {
                                new: true,
                            }
                        )
                            .populate<IUsers>("market.resource")
                            .populate<IUsers>("farm.resource")
                            .populate<IUsers>("barrack.resource");
                        return res.status(200).json({
                            message:
                                "Barrack berhasil dibuat, Golds dan Foods kamu berhasil dikurangi!",
                            data: resultCreate,
                            user: resultUserUpdate,
                        });
                    } else {
                        throw {
                            name: "Name_Used",
                        };
                    }
                } else {
                    throw {
                        name: "Not_Enough",
                    };
                }
            } else {
                throw { name: "Name_Null" };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }
}

export default creates;
