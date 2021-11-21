import express, { Router } from "express";
import attacks from "../controllers/attack.controller";

class attackRoutes {
    attackRoutes: Router;

    constructor() {
        this.attackRoutes = Router();
        this.attackroutes();
    }

    attackroutes = () => {
        this.attackRoutes.post("/:idEnemy", attacks.attack);
    };
}

export default new attackRoutes().attackRoutes;
