import express, { Router } from "express";
import updates from "../controllers/update.controller";

class updateRoutes {
    updateRoutes: Router;
    constructor() {
        this.updateRoutes = Router();
        this.updateroutes();
    }

    updateroutes = () => {
        this.updateRoutes.put("/market/:market", updates.updateMarket);

        this.updateRoutes.put("/barrack/:barrack", updates.updateBarrack);

        this.updateRoutes.put("/farm/:farm", updates.updateFarm);
    };
}

export default new updateRoutes().updateRoutes;
