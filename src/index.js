const express = require('express');
const cors = require("cors");
const { inputData, getData } = require("./app/api.js");
const { collectScheduler, deleteScheduler } = require ("./automation/scheduler.js");

async function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post("/", inputData);
    app.get("/", getData);

    const host = process.env.HOST || "0.0.0.0";
    const port = Number(process.env.PORT) || 3000;

    return { app, host, port };
}

async function start() {
    const { app, host, port } = await createApp();
    collectScheduler.start();
    deleteScheduler.start();
    console.log("Scheduler started...");
    
    try {
        app.listen(port, host, () => {
            console.log(`Server listening on http://${host}:${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start()