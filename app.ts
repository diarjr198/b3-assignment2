import cookieParser from "cookie-parser";
import express, { Application, Request, Response, NextFunction } from "express";
import mongoDB from "./configs/db";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes/routes";
import mining from "./controllers/mining.controller";

// Mining 1 menit
const timerDurationSeconds = 60;
let timerStart = new Date().getTime();

setInterval(async () => {
    await mining.market();
    await mining.farm();
    await mining.barrack();
    timerStart = new Date().getTime();
}, timerDurationSeconds * 1000);

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugin();
        this.route();
    }

    protected plugin = () => {
        this.app.use(cookieParser());
        this.app.use(express.urlencoded({ extended: true }));
        mongoDB.connect();
    };

    protected route = () => {
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).json({ message: `Hello World` });
        });
        this.app.use("/api", routes);
        this.app.use(errorHandler);
    };
}
const app = new App().app;
const port = 8080;

app.listen(port, () => {
    console.log(`server udah jalan bro. https://localhost:${port}`);
});
