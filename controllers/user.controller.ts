import { NextFunction, Response, Request } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import User from "../models/Users";
import IUsers from "../interfaces/IUsers";

class users {
    static async register(req: Request, res: Response, next: NextFunction) {
        const { cookies } = req;
        try {
            if ("access_token" in cookies) {
                console.log("Access Token Exists");
                throw { name: "Register_Fail" };
            } else {
                const { username, email, password } = req.body;
                const usernameRegex =
                    /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
                const validUsername = usernameRegex.test(username);
                if (!validUsername) {
                    throw { name: "Username_Invalid" };
                }
                const resultUsername = await User.findOne({ username });
                if (resultUsername) {
                    throw { name: "Username_Registered" };
                }
                const emailRegex =
                    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
                const validEmail = emailRegex.test(email);
                if (!validEmail) {
                    throw { name: "Email_Invalid" };
                }
                const resultEmail = await User.findOne({ email });
                if (resultEmail) {
                    throw { name: "Email_Registered" };
                }
                const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                const validPassword = passwordRegex.test(password);
                if (!validPassword) {
                    throw { name: "Password_Invalid" };
                }
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);
                const result = await User.create({
                    username,
                    email: email.toLowerCase(),
                    password: hashedPassword,
                });
                return res.status(201).json({
                    success: true,
                    message: "Register Berhasil, Happy Gaming:v",
                    data: result,
                });
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const { cookies } = req;
        try {
            if (!("access_token" in cookies)) {
                const result = await User.findOne({
                    email: email.toLowerCase(),
                })
                    .populate<IUsers>("market.resource")
                    .populate<IUsers>("farm.resource")
                    .populate<IUsers>("barrack.resource");
                if (!result) {
                    throw {
                        name: "Email_Not_Match",
                    };
                }
                const checkPass = bcrypt.compareSync(password, result.password);
                if (!checkPass) {
                    throw {
                        name: "User_Invalid",
                    };
                }
                const privateKey = fs.readFileSync(
                    "./keys/private.key",
                    "utf-8"
                );
                const token = jwt.sign(
                    {
                        id: result.id,
                        email: result.email,
                    },
                    privateKey,
                    {
                        expiresIn: "1h",
                    }
                );
                return res.status(200).cookie("access_token", token).json({
                    message: "Login Berhasil Ngab!",
                    data: result,
                    Access_Token: token,
                });
            } else {
                throw {
                    name: "Your_Logged",
                };
            }
        } catch (error) {
            console.log((error as Error).name);
            next(error);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        res.status(200).clearCookie("access_token").json({
            message: "Logout Berhasil!",
        });
    }
}

export default users;
