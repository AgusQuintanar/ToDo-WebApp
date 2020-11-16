const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

const getTasks = require("./controllers/getTasks");
const addTask = require("./controllers/addTask");
const removeTask = require("./controllers/removeTask");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))

const db = knex({
    client: "mysql",
    connection: {
        host: "54.224.132.83",
        user: "nodejspro",
        password: "Abcd_1234",
        database: "atd_sch",
        port: 3306
    },
});

//* --------- Controllers -----------



app.post("/getTasks", (req, res) => {
    getTasks.handleGetTasks(req, res, db);
});


app.post("/addTask", (req, res) => {
    addTask.handleAddTask(req, res, db);
});


app.post("/removeTask", (req, res) => {
    removeTask.handleRemoveTask(req, res, db);
});


app.listen(3001, () => {
    console.log("Running in port 3001.");
});

