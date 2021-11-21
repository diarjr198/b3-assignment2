import { Schema, model, Model } from "mongoose";
import IFarms from "../interfaces/IFarms";

const farmSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        food: {
            type: Number,
            default: 0,
            max: 20,
        },
    },
    {
        timestamps: true,
    }
);

const Farm: Model<IFarms> = model<IFarms>("farm", farmSchema);

export default Farm;
