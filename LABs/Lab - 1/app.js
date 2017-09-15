/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Wed Sep 13 2017
 *  File : app.js
 *******************************************/
const express = require("express");
let app = express();
let configRoutes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});