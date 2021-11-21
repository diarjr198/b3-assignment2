import express, { Router } from "express";
import claims from "../controllers/claim.controller";

class claimRoutes {
    claimRoutes: Router;
    constructor() {
        this.claimRoutes = Router();
        this.claimroutes();
    }
    claimroutes = () => {
        this.claimRoutes.post("/market", claims.claimAllMarket);

        this.claimRoutes.post("/market/:market", claims.claimMarket);

        this.claimRoutes.post("/barrack", claims.claimAllBarrack);

        this.claimRoutes.post("/barrack/:barrack", claims.claimBarrack);

        this.claimRoutes.post("/farm", claims.claimAllFarm);

        this.claimRoutes.post("/farm/:farm", claims.claimFarm);
    };
}

export default new claimRoutes().claimRoutes;
