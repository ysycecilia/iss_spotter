const request = require("request");

const fetchMyIP = (callback) => {
  const API = 'https://api.ipify.org?format=json';
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
  const API = 'https://freegeoip.app/json/';
  request(`${API}${ip}`, (err, res, body) => {
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

const fetchISSFlyOverTimes = function(coords, callback) {
  const API = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(API, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body).response;
    callback(null, data);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });

    });
  });
};



module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};
