const mongoose = require("mongoose");
require("./config/db.js")

const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");


//Variables de entorno
require("dotenv").config({ path : "variables.env"});

const app = express();


app.use(express.urlencoded({extended : true}));


// Configurar el motor de plantillas Handlebars
app.engine("handlebars",
    exphbs.engine({
        defaultLayout : "layout",
        helpers: require("./helpers/handlebars")
    }));

app.set("view engine", "handlebars");

//Public
app.use(express.static(path.join(__dirname, "public")))

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DATABASE})
}));

// Routing
app.use("/", router());

// Iniciar el servidor
app.listen(process.env.PUERTO, () => {
  console.log("Escuchando en el puerto 5000");
});