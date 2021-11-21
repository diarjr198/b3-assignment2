import { Schema, model, Model } from "mongoose";
import IMarkets from "../interfaces/IMarkets";

const marketSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        gold: {
            type: Number,
            default: 0,
            max: 20,
        },
    },
    {
        timestamps: true,
    }
);

const Market: Model<IMarkets> = model<IMarkets>("market", marketSchema);

export default Market;
