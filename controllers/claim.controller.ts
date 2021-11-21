import { NextFunction, Request, Response } from "express";

import User from "../models/Users";
import Market from "../models/Markets";
import IUsers from "../interfaces/IUsers";
import Farm from "../models/Farms";
import Barrack from "../models/Barracks";

class claims {
    static async claimMarket(req: Request, res: Response, next: NextFunction) {
        try {
            const { userData } = req;
            const { market } = req.params;
            const result = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            for (let i = 0; i < result.market.resource.length; i++) {
                if (market === result.market.resource[i].id) {
                    if (
                        result.townhall.resource.golds +
                            result.market.resource[i].gold <=
                        1000
                    ) {
                        const amountGold = result.market.resource[i].gold;
                        const resultUpdateMarket =
                            await Market.findByIdAndUpdate(
                                market,
                                {
                                    gold: 0,
                                },
                                {
                                    new: true,
                                }
                            );
                        const resultUpdateTownhall =
                            await User.findByIdAndUpdate(
                                userData?.id,
                                {
                                    $inc: {
                                        "townhall.resource.golds": amountGold,
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
                            message: "Market berhasil diclaim",
                            data: resultUpdateMarket,
                            user: resultUpdateTownhall,
                        });
                    } else if (result.townhall.resource.golds === 1000) {
                        return res.status(200).json({
                            message: "Resource Townhall sudah penuh",
                            data: result,
                        });
                    } else {
                        const spaceGold = 1000 - result.townhall.resource.golds;
                        console.log(spaceGold);
                        const resultUpdateMarket =
                            await Market.findByIdAndUpdate(
                                market,
                                {
                                    $inc: {
                                        gold: -spaceGold,
                                    },
                                },
                                {
                                    new: true,
                                }
                            );
                        const resultUpdateTownhall =
                            await User.findByIdAndUpdate(
                                userData?.id,
                                {
                                    $inc: {
                                        "townhall.resource.golds": spaceGold,
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
                            message: "Market berhasil diclaim",
                            data: resultUpdateMarket,
                            user: resultUpdateTownhall,
                        });
                    }
                } else {
                    throw { name: "NOT_FOUND" };
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async claimAllMarket(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { userData } = req;
            const result = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            for (let i = 0; i < result.market.resource.length; i++) {
                if (
                    result.townhall.resource.golds +
                        result.market.resource[i].gold <=
                    1000
                ) {
                    await Market.findByIdAndUpdate(
                        result.market.resource[i].id,
                        {
                            gold: 0,
                        }
                    );
                    await User.findByIdAndUpdate(userData?.id, {
                        $inc: {
                            "townhall.resource.golds":
                                result.market.resource[i].gold,
                        },
                    });
                } else if (result.townhall.resource.golds === 1000) {
                    return res.status(200).json({
                        message: "Resource Townhall sudah penuh",
                        data: result,
                    });
                } else {
                    const resultNew = await User.findById(userData?.id)
                        .populate<IUsers>("market.resource")
                        .populate<IUsers>("farm.resource")
                        .populate<IUsers>("barrack.resource");
                    const spaceGold = 1000 - resultNew!.townhall.resource.golds;
                    await Market.findByIdAndUpdate(
                        result.market.resource[i].id,
                        {
                            $inc: {
                                gold: -spaceGold,
                            },
                        },
                        {
                            new: true,
                        }
                    );
                    const resultUpdateTownhall = await User.findByIdAndUpdate(
                        userData?.id,
                        {
                            $inc: {
                                "townhall.resource.golds": spaceGold,
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
                        message: "Beberapa market berhasil diclaim",
                        data: resultUpdateTownhall.market.resource,
                        user: resultUpdateTownhall,
                    });
                }
                result.townhall.resource.golds +=
                    result.market.resource[i].gold;
            }
            const resultNew = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            return res.status(200).json({
                message: "Semua market berhasil diclaim",
                data: resultNew.market.resource,
                user: resultNew,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async claimFarm(req: Request, res: Response, next: NextFunction) {
        try {
            const { userData } = req;
            const { farm } = req.params;
            const result = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            for (let i = 0; i < result.farm.resource.length; i++) {
                if (farm === result.farm.resource[i].id) {
                    if (
                        result.townhall.resource.foods +
                            result.farm.resource[i].food <=
                        1000
                    ) {
                        const amountFood = result.farm.resource[i].food;
                        const resultUpdateFarm = await Farm.findByIdAndUpdate(
                            farm,
                            {
                                food: 0,
                            },
                            {
                                new: true,
                            }
                        );
                        const resultUpdateTownhall =
                            await User.findByIdAndUpdate(
                                userData?.id,
                                {
                                    $inc: {
                                        "townhall.resource.foods": amountFood,
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
                            message: "Farm berhasil diclaim",
                            data: resultUpdateFarm,
                            user: resultUpdateTownhall,
                        });
                    } else if (result.townhall.resource.foods === 1000) {
                        return res.status(200).json({
                            message: "Resource Townhall sudah penuh",
                            data: result,
                        });
                    } else {
                        const spaceFood = 1000 - result.townhall.resource.foods;
                        console.log(spaceFood);
                        const resultUpdateFarm = await Farm.findByIdAndUpdate(
                            farm,
                            {
                                $inc: {
                                    food: -spaceFood,
                                },
                            },
                            {
                                new: true,
                            }
                        );
                        const resultUpdateTownhall =
                            await User.findByIdAndUpdate(
                                userData?.id,
                                {
                                    $inc: {
                                        "townhall.resource.foods": spaceFood,
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
                            message: "Farm berhasil diclaim",
                            data: resultUpdateFarm,
                            user: resultUpdateTownhall,
                        });
                    }
                } else {
                    throw { name: "NOT_FOUND" };
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async claimAllFarm(req: Request, res: Response, next: NextFunction) {
        try {
            const { userData } = req;
            const result = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            for (let i = 0; i < result.farm.resource.length; i++) {
                if (
                    result.townhall.resource.foods +
                        result.farm.resource[i].food <=
                    1000
                ) {
                    await Farm.findByIdAndUpdate(result.farm.resource[i].id, {
                        food: 0,
                    });
                    await User.findByIdAndUpdate(userData?.id, {
                        $inc: {
                            "townhall.resource.foods":
                                result.farm.resource[i].food,
                        },
                    });
                } else if (result.townhall.resource.foods === 1000) {
                    return res.status(200).json({
                        message: "Resource Townhall sudah penuh",
                        data: result,
                    });
                } else {
                    const resultNew = await User.findById(
                        userData?.id
                    ).populate("farm.resource");
                    const spaceFood = 1000 - resultNew!.townhall.resource.foods;
                    await Farm.findByIdAndUpdate(
                        result.farm.resource[i].id,
                        {
                            $inc: {
                                gold: -spaceFood,
                            },
                        },
                        {
                            new: true,
                        }
                    );
                    const resultUpdateTownhall = await User.findByIdAndUpdate(
                        userData?.id,
                        {
                            $inc: {
                                "townhall.resource.foods": spaceFood,
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
                        message: "Beberapa Farm berhasil diclaim",
                        data: resultUpdateTownhall.farm.resource,
                        user: resultUpdateTownhall,
                    });
                }
                result.townhall.resource.foods += result.farm.resource[i].food;
            }
            const resultNew = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            return res.status(200).json({
                message: "Semua Farm berhasil diclaim",
                data: resultNew.farm.resource,
                user: resultNew,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async claimBarrack(req: Request, res: Response, next: NextFunction) {
        try {
            const { userData } = req;
            const { barrack } = req.params;
            const result = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            for (let i = 0; i < result.barrack.resource.length; i++) {
                if (barrack === result.barrack.resource[i].id) {
                    if (
                        result.townhall.resource.soldiers +
                            result.barrack.resource[i].soldier <=
                        500
                    ) {
                        const amountSoldier =
                            result.barrack.resource[i].soldier;
                        const resultUpdateBarrack =
                            await Barrack.findByIdAndUpdate(
                                barrack,
                                {
                                    soldier: 0,
                                },
                                {
                                    new: true,
                                }
                            );
                        const resultUpdateTownhall =
                            await User.findByIdAndUpdate(
                                userData?.id,
                                {
                                    $inc: {
                                        "townhall.resource.soldiers":
                                            amountSoldier,
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
                            message: "Barrack berhasil diclaim",
                            data: resultUpdateBarrack,
                            user: resultUpdateTownhall,
                        });
                    } else if (result.townhall.resource.soldiers === 500) {
                        return res.status(200).json({
                            message: "Resource Townhall sudah penuh",
                            data: result,
                        });
                    } else {
                        const spaceSoldier =
                            500 - result.townhall.resource.soldiers;
                        console.log(spaceSoldier);
                        const resultUpdateBarrack =
                            await Barrack.findByIdAndUpdate(
                                barrack,
                                {
                                    $inc: {
                                        soldier: -spaceSoldier,
                                    },
                                },
                                {
                                    new: true,
                                }
                            );
                        const resultUpdateTownhall =
                            await User.findByIdAndUpdate(
                                userData?.id,
                                {
                                    $inc: {
                                        "townhall.resource.soldiers":
                                            spaceSoldier,
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
                            message: "Barrack berhasil diclaim",
                            data: resultUpdateBarrack,
                            user: resultUpdateTownhall,
                        });
                    }
                } else {
                    throw { name: "NOT_FOUND" };
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async claimAllBarrack(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userData } = req;
        try {
            const result = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            for (let i = 0; i < result.barrack.resource.length; i++) {
                if (
                    result.townhall.resource.soldiers +
                        result.barrack.resource[i].soldier <=
                    500
                ) {
                    await Barrack.findByIdAndUpdate(
                        result.barrack.resource[i].id,
                        {
                            soldier: 0,
                        }
                    );
                    await User.findByIdAndUpdate(userData?.id, {
                        $inc: {
                            "townhall.resource.soldiers":
                                result.barrack.resource[i].soldier,
                        },
                    });
                } else if (result.townhall.resource.soldiers === 500) {
                    return res.status(200).json({
                        message: "Resource Townhall sudah penuh",
                        data: result,
                    });
                } else {
                    const resultNew = await User.findById(
                        userData?.id
                    ).populate("barrack.resource");
                    const spaceSoldier =
                        1000 - resultNew!.townhall.resource.soldiers;
                    await Barrack.findByIdAndUpdate(
                        result.barrack.resource[i].id,
                        {
                            $inc: {
                                soldier: -spaceSoldier,
                            },
                        },
                        {
                            new: true,
                        }
                    );
                    const resultUpdateTownhall = await User.findByIdAndUpdate(
                        userData?.id,
                        {
                            $inc: {
                                "townhall.resource.soldiers": spaceSoldier,
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
                        message: "Beberapa Barrack berhasil diclaim",
                        data: resultUpdateTownhall.barrack.resource,
                        user: resultUpdateTownhall,
                    });
                }
                result.townhall.resource.soldiers +=
                    result.barrack.resource[i].soldier;
            }
            const resultNew = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            return res.status(200).json({
                message: "Semua Barrack berhasil diclaim",
                data: resultNew.barrack.resource,
                user: resultNew,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default claims;
