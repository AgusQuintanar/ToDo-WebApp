const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

const getTasks = require("./controllers/getTasks");



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
app.get("/getTasks", (req, res) => {
    getTasks.handleGetTasks(req, res, db);
});

// app.get("/registroGeneral", (req, res) => {
//     registroGeneral.handleGetRG(req, res, db);
// });


// app.get("/expedienteMedico", (req, res) => {
//     expedienteMedico.handleGetEM(req, res, db);
// });

// app.get("/hogarTemporal", (req, res) => {
//     hogarTemporal.handleGetHT(req, res, db);
// });

// app.get("/adopcion", (req, res) => {
//     adopcion.handleGetA(req, res, db);
// });

// app.post("/login", login.handleLogin(db, bcrypt));
// app.post("/registro", registro.handleRegistro(db, bcrypt));
// app.get("/usuarios", usuarios.handleUsuariosGet(db));
// app.put("/cambiarCorreo", cambiarCorreo.handleCorreo(db));
// app.put("/cambiarContrasena", cambiarContrasena.handleContrasena(db));

// app.put("/subirImagenRegistro", subirImagen.handleImagenRegistro(db));
// app.put("/subirImagenMedico", subirImagen.handleImagenMedico(db));
// app.put("/subirImagenHogar", subirImagen.handleImagenHogar(db));
// app.put("/subirImagenAdopcion", subirImagen.handleImagenAdopcion(db));
// app.post("/eliminarUsuario", eliminarUsuario.handleEliminarUsuario(db));

app.listen(3001, () => {
    console.log("Running in port 3001");
});

// const sharp = require("sharp");
