import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import controller from "./src/controller.js";

const app = express();
const port = 8080;

import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        ca: process.env.DB_SSL
    }
};

const pgPool = new Pool(dbConfig);
await pgPool.connect()
    .then(client => {
        console.log("Test Connection Open");
        client.release();
        console.log("Test Connection Closed")
    })
    .catch(err => {
        console.error("Error connecting to the PostgreSQL database:", err);
    });

const defaultController = new controller();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_, res) => {
    res.send("Hello ClassSync!");
});

app.post("/signup", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        await defaultController.signup(firstname, lastname, email, password);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await defaultController.login(email, password);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/pingcheck", (_, res) => {
    res.send("pong");
  });

app.listen(port, () => {
    console.log(`ClassSync backend listening on port ${port}`);
});


export default pgPool;