import express, { Router } from "express";
import deletes from "../controllers/delete.controller";

class deleteRoutes {
    deleteRoutes: Router;
    constructor() {
        this.deleteRoutes = Router();
        this.deleteroutes();
    }
    deleteroutes = () => {
        this.deleteRoutes.delete("/market/:market", deletes.deleteMarket);

        this.deleteRoutes.delete("/barrack/:barrack", deletes.deleteBarrack);

        this.deleteRoutes.delete("/farm/:farm", deletes.deleteFarm);
    };
}

export default new deleteRoutes().deleteRoutes;
