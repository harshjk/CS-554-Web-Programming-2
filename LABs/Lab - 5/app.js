/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Wed Oct 18 2017
 *  File : app.js
 *******************************************/
const express = require("express");
const bluebird = require("bluebird");
const redis = require("redis");
const jsonFileObject = require("jsonfile");

const flat = require("flat");
const unflatten = flat.unflatten;

let app = express();

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const dataFile = "lab5.json";

const data = jsonFileObject.readFileSync(dataFile);

let history = [];


searchResultInDB = async (id) => {
    let result = data.filter(function (data) {
        return data.id == id;
    });
    if (result.length > 0) {
        history.unshift(result);
        let flatHistory = flat(history);
        let hmSetAsyncHistory = await client.hmsetAsync("history", flatHistory);
        let flatBioFromRedis = await client.hgetallAsync("history");
        console.log("------------------------------------------");
        console.dir(flatBioFromRedis);
        console.log("------------------------------------------");
        return(result);
    }
    else {
        return({ error: "No data found with given id" });
    }
};

getById = (async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isNaN(id)) {
                resolve({ error: "Id should be in number format" });
            }
            resolve(searchResultInDB(id));
        }, 5000);
    });
});

app.get("/api/people/:id", async (req, res) => {
    let result = await getById(req.params.id);
    res.json(result);
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
