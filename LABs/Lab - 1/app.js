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

app.use(function (request, response, next) {
    console.log("Request URL: " + request.path + "\n Request Body: " + JSON.stringify(request.body) + "\n Request HTTP Verb: " + request.method);
    next();
});

// 2. One which will count the number of requests that have been made to the current path
const pathsAccessed = {};
app.use(function (request, response, next) {
    if (!pathsAccessed[request.path]) pathsAccessed[request.path] = 0;

    pathsAccessed[request.path]++;

    console.log("There have now been " + pathsAccessed[request.path] + " requests made to " + request.path);
    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});