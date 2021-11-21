import mongoose from "mongoose";

class mongoDB {
    constructor() {}

    public static connect = async () => {
        try {
            const dbPathUrl = "mongodb://localhost:27017/";
            const dbName = "ClashOfVillages";
            await mongoose.connect(`${dbPathUrl}${dbName}`);
            console.log("DB Connected");
        } catch (error) {
            console.log(error);
        }
    };
}

export default mongoDB;
