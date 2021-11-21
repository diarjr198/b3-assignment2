import { NextFunction, Request, Response } from "express";

import User from "../models/Users";
import Market from "../models/Markets";
import Farm from "../models/Farms";
import IUsers from "../interfaces/IUsers";
import Barrack from "../models/Barracks";

class deletes {
    static async deleteMarket(req: Request, res: Response, next: NextFunction) {
        try {
            const { userData } = req;
            const { market } = req.params;
            const result = await Market.findByIdAndDelete(market);
            if (!result) {
                throw { name: "NOT_FOUND" };
            }
            const resultUser = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            if (
                resultUser.townhall.resource.golds + 30 <= 1000 &&
                resultUser.townhall.resource.foods + 10 <= 1000
            ) {
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "market.amount": -1,
                        "townhall.resource.golds": 30,
                        "townhall.resource.foods": 10,
                    },
                    $pull: {
                        "market.resource": market,
                    },
                });
                res.status(200).json({
                    message:
                        "Market berhasil di delete, dan resource telah dikembalikan",
                    data: result,
                });
            } else if (
                resultUser.townhall.resource.golds === 1000 &&
                resultUser.townhall.resource.foods === 1000
            ) {
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "market.amount": -1,
                    },
                    $pull: {
                        "market.resource": market,
                    },
                });
                res.status(200).json({
                    message:
                        "Market berhasil di delete, dan resource penuh gagal dikembalikan",
                    data: result,
                });
            } else {
                const spaceGolds = 1000 - resultUser.townhall.resource.golds;
                const spaceFoods = 1000 - resultUser.townhall.resource.foods;
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "market.amount": -1,
                        "townhall.resource.golds": spaceGolds,
                        "townhall.resource.foods": spaceFoods,
                    },
                    $pull: {
                        "market.resource": market,
                    },
                });
                res.status(200).json({
                    message:
                        "Market berhasil di delete, dan resource telah dikembalikan",
                    data: result,
                });
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async deleteFarm(req: Request, res: Response, next: NextFunction) {
        try {
            const { userData } = req;
            const { farm } = req.params;
            const result = await Farm.findByIdAndDelete(farm);
            if (!result) {
                throw { name: "NOT_FOUND" };
            }
            const resultUser = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            if (
                resultUser.townhall.resource.golds + 10 <= 1000 &&
                resultUser.townhall.resource.foods + 30 <= 1000
            ) {
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "farm.amount": -1,
                        "townhall.resource.golds": 10,
                        "townhall.resource.foods": 30,
                    },
                    $pull: {
                        "farm.resource": farm,
                    },
                });
                res.status(200).json({
                    message:
                        "Farm berhasil di delete, dan resource telah dikembalikan",
                    data: result,
                });
            } else if (
                resultUser.townhall.resource.golds === 1000 &&
                resultUser.townhall.resource.foods === 1000
            ) {
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "farm.amount": -1,
                    },
                    $pull: {
                        "farm.resource": farm,
                    },
                });
                res.status(200).json({
                    message:
                        "Farm berhasil di delete, dan resource penuh gagal dikembalikan",
                    data: result,
                });
            } else {
                const spaceGolds = 1000 - resultUser.townhall.resource.golds;
                const spaceFoods = 1000 - resultUser.townhall.resource.foods;
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "farm.amount": -1,
                        "townhall.resource.golds": spaceGolds,
                        "townhall.resource.foods": spaceFoods,
                    },
                    $pull: {
                        "farm.resource": farm,
                    },
                });
                res.status(200).json({
                    message:
                        "Farm berhasil di delete, dan resource telah dikembalikan",
                    data: result,
                });
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async deleteBarrack(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { userData } = req;
            const { barrack } = req.params;
            const result = await Barrack.findByIdAndDelete(barrack);
            if (!result) {
                throw { name: "NOT_FOUND" };
            }
            const resultUser = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            if (
                resultUser.townhall.resource.golds + 30 <= 1000 &&
                resultUser.townhall.resource.foods + 30 <= 1000
            ) {
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "barrack.amount": -1,
                        "townhall.resource.golds": 30,
                        "townhall.resource.foods": 30,
                    },
                    $pull: {
                        "barrack.resource": barrack,
                    },
                });
                res.status(200).json({
                    message:
                        "Barrack berhasil di delete, dan resource telah dikembalikan",
                    data: result,
                });
            } else if (
                resultUser.townhall.resource.golds === 1000 &&
                resultUser.townhall.resource.foods === 1000
            ) {
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "barrack.amount": -1,
                    },
                    $pull: {
                        "barrack.resource": barrack,
                    },
                });
                res.status(200).json({
                    message:
                        "Barrack berhasil di delete, dan resource penuh gagal dikembalikan",
                    data: result,
                });
            } else {
                const spaceGolds = 1000 - resultUser.townhall.resource.golds;
                const spaceFoods = 1000 - resultUser.townhall.resource.foods;
                await User.findByIdAndUpdate(userData?.id, {
                    $inc: {
                        "barrack.amount": -1,
                        "townhall.resource.golds": spaceGolds,
                        "townhall.resource.foods": spaceFoods,
                    },
                    $pull: {
                        "barrack.resource": barrack,
                    },
                });
                res.status(200).json({
                    message:
                        "Barrack berhasil di delete, dan resource telah dikembalikan",
                    data: result,
                });
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }
}

export default deletes;
