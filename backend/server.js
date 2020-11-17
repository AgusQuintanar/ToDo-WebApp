const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const getTasks = require("./controllers/getTasks");
const getTask = require("./controllers/getTask");
const addTask = require("./controllers/addTask");
const removeTask = require("./controllers/removeTask");
const updateTask = require("./controllers/updateTask");
const getLists = require("./controllers/getLists");
const addList = require("./controllers/addList");
const removeList = require("./controllers/removeList");
const registerUser = require("./controllers/registerUser");
const login = require("./controllers/login");

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

app.post("/getTask", (req, res) => {
    getTask.handleGetTask(req, res, db);
});

app.post("/addTask", (req, res) => {
    addTask.handleAddTask(req, res, db);
});

app.post("/removeTask", (req, res) => {
    removeTask.handleRemoveTask(req, res, db);
});

app.put("/updateTask", (req, res) => {
    updateTask.handleUpdateTask(req, res, db);
});

app.post("/getLists", (req, res) => {
    getLists.handleGetLists(req, res, db);
});

app.post("/addList", (req, res) => {
    addList.handleAddList(req, res, db);
});

app.post("/removeList", (req, res) => {
    removeList.handleRemoveList(req, res, db);
});

app.post("/registerUser", (req, res) => {
    registerUser.handleRegisterUser(req, res, db);
});

app.post("/login", (req, res) => {
    login.handleLogin(req, res, db);
});




app.listen(3001, () => {
    console.log("Running in port 3001.");
});

