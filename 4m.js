const axios = require("axios");
const https = require('https');

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const printResponses = (urls = []) => {
  let printHandlerClosure = printHandler(urls.length);
  printHandlerClosure.start();
  urls.forEach(async (url, idx) => {
    instance.get(
        url
    ).then(res => {
      printHandlerClosure.addResolution(idx, res.data.url)
    })
  })
}

const printHandler = (maxLength) => {
  let workIdx = 0;
  let resolutions = [];
  return {
    start: function () {
      let interval = setInterval(() => {
        if (resolutions[workIdx]) {
          console.log(resolutions[workIdx])
          workIdx++;
        }
        if (workIdx == maxLength) {
          clearInterval(interval)
        }
      }, 1)
    },
    addResolution: function (idx, resolution) {
      resolutions[idx] = resolution;
    }
  }
}

let urls = ["https://swapi.dev/api/people/1",
  "https://swapi.dev/api/people/3",
  "https://swapi.dev/api/people/2"];

printResponses(urls);

