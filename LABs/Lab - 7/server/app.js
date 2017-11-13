/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 09 2017
 *  File : app.js
 *******************************************/

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const redis = require("redis");

const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

const client = redis.createClient();

const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const newsFeed = io.of("/harshGramNewsfeed");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

newsFeed.on("connection", socket => {
  console.log("Socket Started");
  socket.on("postFeed", async postRequest => {
    console.log(postRequest);
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "search-images",
      data: {
        username: postRequest.username,
        message: postRequest.message,
        searchQuery: postRequest.query
      }
    });
    newsFeed.emit("newsFeed", response);
  });
});

http.listen(3000, () => {
  console.log("Server Started");
  console.log("Starting listening on http://localhost:3000/");
});
