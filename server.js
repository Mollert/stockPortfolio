
const express = require("express");
const request = require("request");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");


const app = express();
const router = express.Router();
const port = process.env.PORT || 5800;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname ,"public")));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname ,"views"));

const indexPage = require("./controllers/indexRoute.js");
const addPage = require("./controllers/addTransactionRoute.js");
const postPage = require("./controllers/postValueRoute.js");
const allPage = require("./controllers/allInclusiveRoute.js");
const errorPage = require("./controllers/errorRoute.js");

app.use("/error", errorPage);
app.use("/addTransaction", addPage);
app.use("/postValue", postPage);
app.use("/allInclusive", allPage);
app.use("/", indexPage);


app.listen(port, () => console.log(`Tuned In and Turned On to port ${port}`));