import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors())
server.use(morgan("dev"))

server.use("/api", routes);

server.listen(8000, () => {
    console.log("Server is running on port 8000");
})
