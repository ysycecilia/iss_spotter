const request = require("request");
const API = 'https://api.ipify.org?format=json';


const fetchMyIP = (callback) => {
  request(API, (err, res, body) => {
    //console.log(body);
    const data = JSON.parse(body);

    if (err) {
      callback(err, null);
      return;
    }
    
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, data.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, res, body) => {
    const coordsByIP = {};
    coordsByIP["latitude"] = JSON.parse(body).latitude;
    coordsByIP["longitude"] = JSON.parse(body).longitude;

    if (err) {
      callback(err, null);
      return;
    }
    
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, coordsByIP);
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP};