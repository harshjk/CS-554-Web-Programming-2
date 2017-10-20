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
        history.unshift(result[0]);
        let putData = await client.setAsync(result[0].id.toString(), JSON.stringify(result[0]));
        //console.log(result[0].id.toString());
        //let hello = await client.getAsync(result[0].id);
        //console.log("------------------------------------------");
        //console.log(`Data: ${hello}`);
        //console.log("------------------------------------------");
        return (result[0]);
    }
    else {
        return ({ error: "No data found with given id" });
    }
};

getResultFromCache = (id) => {
    return new Promise(async (resolve, reject) => {
        let result = await client.getAsync(id.toString());
        history.unshift(JSON.parse(result));
        resolve(result);
    });
}

isDataInCache = (id) => {
    return new Promise(async (resolve, reject) => {
        let doesIdExist = await client.existsAsync(id.toString());
        resolve(doesIdExist === 1);
    });
};

getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            if (isNaN(id)) {
                //console.log("No");
                resolve({ error: "Id should be in number format" });
            }
            let isExistInCache = await isDataInCache(id);
            if (isExistInCache) {
                let data = await getResultFromCache(id);
                console.log("From Cache");
                resolve(JSON.parse(data));
            }
            else {
                console.log("From Data Module");
                resolve(searchResultInDB(id));
            }
        }, 5000);
    });
};
app.get("/api/people/history", async (req, res) => {
    res.json(history.slice(0,20));
});

app.get("/api/people/:id", async (req, res) => {
    let result = await getById(req.params.id);
    res.json(result);
});


app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
