import "express-async-errors";
import express, { Application, json } from "express";
import { handleError } from "./errors";
import clientsRoutes from "./routes/clients.routes";
import contactsRoutes from "./routes/contacts.routes";

const app: Application = express();
app.use(json());

app.use("/clients", clientsRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleError);

export default app;
