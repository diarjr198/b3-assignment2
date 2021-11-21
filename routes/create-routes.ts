import express, { Router } from "express";
import creates from "../controllers/create.controller";

class createRoutes {
    createRoutes: Router;
    constructor() {
        this.createRoutes = Router();
        this.createroutes();
    }
    createroutes = () => {
        this.createRoutes.post("/market", creates.createMarket);

        this.createRoutes.post("/farm", creates.createFarm);

        this.createRoutes.post("/barrack", creates.createBarrack);
    };
}

export default new createRoutes().createRoutes;
