import { Schema, model, Model } from "mongoose";
import IBarrack from "../interfaces/IBarracks";

const barrackSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        soldier: {
            type: Number,
            default: 0,
            max: 20,
        },
    },
    {
        timestamps: true,
    }
);

const Barrack: Model<IBarrack> = model<IBarrack>("barrack", barrackSchema);

export default Barrack;
