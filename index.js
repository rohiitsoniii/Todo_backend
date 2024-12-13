import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./src/config/dbConnect.js";
import CreateAdmin from "./seed.js";
import Routes from "./src/routes/index.js";

config();

const app = express();
app.use(cors(
    {
        origin: "*"
    }
));
app.use(express.json());

CreateAdmin();

app.get("/test", (req, res) => {
    res.send("server is working fine");
});

app.use("/api/", Routes);
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log("error conneccting database",error);
});

