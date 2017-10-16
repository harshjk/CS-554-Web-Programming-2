import axios from "axios";
import qs from "qs";

const apiRoot = "https://pokeapi.co/api/v2/";

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    console.log(JSON.stringify(config));
    config.url = `${apiRoot}${config.url}`;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;