import express, { Router } from "express";
import list from "../controllers/list.controller";

class listRoutes {
    listRoutes: Router;
    constructor() {
        this.listRoutes = Router();
        this.listroutes();
    }

    listroutes = () => {
        this.listRoutes.get("/market", list.listMarketOwned);

        this.listRoutes.get("/market/:market", list.listMarketOwnedSpecific);

        this.listRoutes.get("/barrack", list.listBarrackOwned);

        this.listRoutes.get("/barrack/:barrack", list.listBarrackOwnedSpecific);

        this.listRoutes.get("/farm", list.listFarmOwned);

        this.listRoutes.get("/farm/:farm", list.listFarmOwnedSpecific);
    };
}

export default new listRoutes().listRoutes;
