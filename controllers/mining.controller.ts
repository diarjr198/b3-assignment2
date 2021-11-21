import Barrack from "../models/Barracks";
import Farm from "../models/Farms";
import Market from "../models/Markets";

class mining {
    static async market() {
        const result = await Market.find();
        for (let i = 0; i < result.length; i++) {
            if (result[i].gold < 20) {
                await Market.updateOne(
                    {
                        name: result[i].name,
                    },
                    {
                        $inc: {
                            gold: 1,
                        },
                    }
                );
                console.log(`${result[i].name}: ${result[i].gold + 1}`);
            }
        }
    }

    static async farm() {
        const result = await Farm.find();
        for (let i = 0; i < result.length; i++) {
            if (result[i].food < 20) {
                await Farm.updateOne(
                    {
                        name: result[i].name,
                    },
                    {
                        $inc: {
                            food: 1,
                        },
                    }
                );
                console.log(`${result[i].name}: ${result[i].food + 1}`);
            }
        }
    }

    static async barrack() {
        const result = await Barrack.find();
        for (let i = 0; i < result.length; i++) {
            if (result[i].soldier < 10) {
                await Barrack.updateOne(
                    {
                        name: result[i].name,
                    },
                    {
                        $inc: {
                            soldier: 1,
                        },
                    }
                );
                console.log(`${result[i].name}: ${result[i].soldier + 1}`);
            }
        }
    }
}

export default mining;
