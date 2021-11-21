import { NextFunction, Request, Response } from "express";

import User from "../models/Users";
import IUsers from "../interfaces/IUsers";

class attacks {
    static async attack(req: Request, res: Response, next: NextFunction) {
        try {
            const { userData } = req;
            const { idEnemy } = req.params;
            if (userData?.id === idEnemy) {
                throw { name: "ID_Same" };
            }
            const MyUser = await User.findById(userData?.id)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            const Enemy = await User.findById(idEnemy)
                .populate<IUsers>("market.resource")
                .populate<IUsers>("farm.resource")
                .populate<IUsers>("barrack.resource");
            if (MyUser.townhall.resource.soldiers <= 50) {
                throw { name: "Your_Soldier_Low" };
            }
            if (
                MyUser.townhall.resource.golds === 1000 &&
                MyUser.townhall.resource.foods === 1000
            ) {
                throw { name: "Your_Resource_Full" };
            }
            if (Enemy) {
                if (Enemy.townhall.resource.soldiers <= 50) {
                    throw { name: "Soldier_Enemy_Low" };
                }
                const luckyList = [];
                for (let i = 0; i < 3; i++) {
                    let luck = Math.round(Math.random() * 99) + 1;
                    if (luck > 50) {
                        luckyList.push("Win");
                        console.log(
                            `Persentase kemenangan ke-${
                                i + 1
                            }: ${luck}% (Menang)`
                        );
                    } else {
                        luckyList.push("Lose");
                        console.log(
                            `Persentase kemenangan ke-${
                                i + 1
                            }: ${luck}% (Kalah)`
                        );
                    }
                }
                // console.log(luckyList);
                const winnerOrLose = luckyList.filter(
                    (element) => element === "Win"
                );
                if (winnerOrLose.length > 1) {
                    console.log(`Selamat kamu menang atau beruntung!`);
                    const resultAttacked = await User.findById(idEnemy);
                    if (
                        MyUser.townhall.resource.golds +
                            0.5 * resultAttacked!.townhall.resource.golds >=
                        1000
                    ) {
                        const resultUpdateAttacker =
                            await User.findByIdAndUpdate(
                                userData?.id,
                                {
                                    "townhall.resource.golds": 1000,
                                    "townhall.resource.foods": 1000,
                                    "townhall.resource.medals": 5,
                                    "townhall.resource.soldiers": 0,
                                },
                                { new: true }
                            );
                        const resultUpdateAttacked =
                            await User.findByIdAndUpdate(
                                idEnemy,
                                {
                                    $inc: {
                                        "townhall.resource.golds": -Math.trunc(
                                            0.5 *
                                                resultAttacked!.townhall
                                                    .resource.golds
                                        ),
                                        "townhall.resource.foods": -Math.trunc(
                                            0.5 *
                                                resultAttacked!.townhall
                                                    .resource.foods
                                        ),
                                        "townhall.resource.medals": -Math.ceil(
                                            0.5 *
                                                resultAttacked!.townhall
                                                    .resource.medals
                                        ),
                                    },
                                },
                                { new: true }
                            );
                        console.log(
                            `Resource kamu: ${resultUpdateAttacker?.townhall.resource}`
                        );
                        console.log(
                            `Resource lawan: ${resultUpdateAttacked?.townhall.resource}`
                        );
                        return res.status(200).json({
                            success: true,
                            results: luckyList,
                            message: "Selamat kamu menang atau beruntung!",
                            resource: {
                                Kamu: resultUpdateAttacker?.townhall.resource,
                                YourGet: {
                                    golds: Math.trunc(
                                        0.5 *
                                            resultAttacked!.townhall.resource
                                                .golds
                                    ),
                                    foods: Math.trunc(
                                        0.5 *
                                            resultAttacked!.townhall.resource
                                                .foods
                                    ),
                                    medals: 5,
                                },
                            },
                        });
                    }
                    const resultUpdateAttacker = await User.findByIdAndUpdate(
                        userData?.id,
                        {
                            $inc: {
                                "townhall.resource.golds": Math.trunc(
                                    0.5 *
                                        resultAttacked!.townhall.resource.golds
                                ),
                                "townhall.resource.foods": Math.trunc(
                                    0.5 *
                                        resultAttacked!.townhall.resource.foods
                                ),
                                "townhall.resource.medals": 5,
                            },
                            "townhall.resource.soldiers": 0,
                        },
                        { new: true }
                    );
                    const resultUpdateAttacked = await User.findByIdAndUpdate(
                        idEnemy,
                        {
                            $inc: {
                                "townhall.resource.golds": -Math.trunc(
                                    0.5 *
                                        resultAttacked!.townhall.resource.golds
                                ),
                                "townhall.resource.foods": -Math.trunc(
                                    0.5 *
                                        resultAttacked!.townhall.resource.foods
                                ),
                                "townhall.resource.medals": -Math.ceil(
                                    0.5 *
                                        resultAttacked!.townhall.resource.medals
                                ),
                            },
                        },
                        { new: true }
                    );
                    console.log(
                        `Resource kamu: ${resultUpdateAttacker?.townhall.resource}`
                    );
                    console.log(
                        `Resource lawan: ${resultUpdateAttacked?.townhall.resource}`
                    );
                    return res.status(200).json({
                        success: true,
                        results: luckyList,
                        message: "Selamat kamu menang atau beruntung!",
                        resource: {
                            Kamu: resultUpdateAttacker?.townhall.resource,
                            YourGet: {
                                golds: Math.trunc(
                                    0.5 *
                                        resultAttacked!.townhall.resource.golds
                                ),
                                foods: Math.trunc(
                                    0.5 *
                                        resultAttacked!.townhall.resource.foods
                                ),
                                medals: 5,
                            },
                        },
                    });
                } else {
                    console.log(`Maaf kamu kalah atau belum beruntung!`);
                    const resultAttacker = await User.findById(userData?.id);
                    const resultUpdateAttacker = await User.findByIdAndUpdate(
                        userData?.id,
                        {
                            $inc: {
                                "townhall.resource.medals": -Math.ceil(
                                    0.5 *
                                        resultAttacker!.townhall.resource.medals
                                ),
                            },
                            "townhall.resource.soldiers": 0,
                        },
                        { new: true }
                    );
                    const resultUpdateAttacked = await User.findByIdAndUpdate(
                        idEnemy,
                        {
                            $inc: {
                                "townhall.resource.medals": 2,
                            },
                        },
                        { new: true }
                    );
                    console.log(
                        `Resource kamu: ${resultUpdateAttacker?.townhall.resource}`
                    );
                    console.log(
                        `Resource lawan: ${resultUpdateAttacked?.townhall.resource}`
                    );
                    return res.status(200).json({
                        success: true,
                        results: luckyList,
                        message: "Maaf kamu kalah atau belum beruntung!",
                        resource: {
                            Kamu: resultUpdateAttacker?.townhall.resource,
                            YourGet: {
                                medals: -Math.ceil(
                                    0.5 *
                                        resultAttacker!.townhall.resource.medals
                                ),
                            },
                        },
                    });
                }
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }
}

export default attacks;
