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





// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_, res) => {
    res.send("Hello ClassSync!");
});

app.post("/signup", async (req, res) => {
    console.log("Signup request received");
    const { firstname, lastname, email, password } = req.body;
    try {
        await defaultController.signup(firstname, lastname, email, password);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/orders/history/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await defaultController.getCompletedOrdersByReceiver(id);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });

    }
});
app.post("/login", async (req, res) => {
    console.log("Login request received");
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const response = await defaultController.login(email, password);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all available items for someone looking for food
app.get("/available", async (req, res) => {
    try {
        const response = await defaultController.getAvailableItems();
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get current orders for creator
app.get("/inprogress/creator/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await defaultController.getInProgressOrdersByCreator(id);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get current orders for receiver 
app.get("/inprogress/receiver/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await defaultController.getInProgressOrdersByReceiver(id);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get order history for creator profile
app.get("/categories/creator/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await defaultController.getCategoriesByCreator(id);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/order/complete/:order_id", async (req, res) => {
    const { order_id } = req.params;
    console.log("Order is ", order_id)
    try {
        await defaultController.completeOrder(order_id);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.delete("/order/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await defaultController.deleteOrder(id);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
// Place order 
app.post("/order/:dish_id/:receiver_id", async (req, res) => {
    const { dish_id, receiver_id } = req.params;
    try {
        await defaultController.placeOrder(dish_id, receiver_id);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/pingcheck", (_, res) => {
    res.send("pong");
  });

app.delete("/food/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await defaultController.deleteFood(id);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }

});
app.post("/food", async (req, res) => {
    const { creator_id, address, type, expiry, diet, description, image, name } = req.body;
    // Now you can use these variables in your code
    try {
        const response = await defaultController.insertFood(creator_id, address, type, expiry, diet, description, image, name);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });

    }
});



app.listen(port, () => {
    console.log(`ClassSync backend listening on port ${port}`);
});






// insert dish
// edit dish


export default pgPool;