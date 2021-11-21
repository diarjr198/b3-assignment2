import { Schema, model, Model } from "mongoose";
import IStudent from "../interfaces/IUsers";

const userSchema = new Schema(
    {
        username: {
            type: String,
            min: 8,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        townhall: {
            resource: {
                golds: {
                    type: Number,
                    default: 100,
                    max: 1000,
                },
                foods: {
                    type: Number,
                    default: 100,
                    max: 1000,
                },
                soldiers: {
                    type: Number,
                    default: 0,
                    max: 500,
                },
                medals: {
                    type: Number,
                    default: 0,
                },
            },
        },
        market: {
            amount: {
                type: Number,
                default: 0,
            },
            resource: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "market",
                },
            ],
        },
        farm: {
            amount: {
                type: Number,
                default: 0,
            },
            resource: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "farm",
                },
            ],
        },
        barrack: {
            amount: {
                type: Number,
                default: 0,
            },
            resource: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "barrack",
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IStudent> = model<IStudent>("user", userSchema);
export default User;
