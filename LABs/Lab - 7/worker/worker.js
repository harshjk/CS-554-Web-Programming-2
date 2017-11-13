/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Sun Nov 12 2017
 *  File : worker.js
 *******************************************/
const redisConnection = require("./redis-connection");
const axios = require("axios");
//const apiKey = "6997246-b9f1801027999637edd8db3b3";
let baseURL =
  "https://pixabay.com/api/?key=6997246-b9f1801027999637edd8db3b3&q=";

redisConnection.on("search-images:request:*", async (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;
  let requestPost = message.data;

  let apiRequestURL = baseURL + encodeURIComponent(requestPost.searchQuery);

  let res = await axios.get(apiRequestURL);

  let responseResult = res.data;
  let previewImages = responseResult.hits.map(function(obj) {
    return obj.previewURL;
  });
  let successEvent = `${eventName}:success:${requestId}`;

  redisConnection.emit(successEvent, {
    requestId: requestId,
    data: {
      result: previewImages,
      message: requestPost.message,
      username: requestPost.username
    },
    eventName: eventName
  });
});
