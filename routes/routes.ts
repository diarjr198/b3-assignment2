import express, { Request, Response, NextFunction, Router } from "express";
import list from "../controllers/list.controller";
import userController from "../controllers/user.controller";
import authJwt from "../middlewares/authJwt";
import checkID from "../middlewares/checkID";
import attackRoutes from "./attack-routes";
import claimRoutes from "./claim-routes";
import createRoutes from "./create-routes";
import deleteRoutes from "./delete-routes";
import listRoutes from "./list-routes";
import updateRoutes from "./update-routes";

class Routes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes = () => {
        this.router.get("/", (req: Request, res: Response) => {
            res.send("test");
        });
        this.router.post("/logout", userController.logout);
        this.router.post("/register", userController.register);

        this.router.use(authJwt.authentication);

        this.router.post("/login", userController.login);

        this.router.get("/user/:id", checkID, list.listUser);

        this.router.use("/user/:id/list", checkID, listRoutes);
        this.router.use("/user/:id/create", checkID, createRoutes);
        this.router.use("/user/:id/update", checkID, updateRoutes);
        this.router.use("/user/:id/delete", checkID, deleteRoutes);
        this.router.use("/user/:id/claim", checkID, claimRoutes);
        this.router.use("/user/:id/attack", checkID, attackRoutes);
    };
}

export default new Routes().router;
