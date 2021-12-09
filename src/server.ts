import "reflect-metadata"
import express from "express";
import "./database"
import "./shared/container"
import { routes } from "./routes";
//import swaggerUi from "swagger-ui-express"
//import swaggerFile from "./swagger.json"

const app = express();

app.use(express.json());

app.use(routes)

app.listen(3333, () => console.log("Server is running"));