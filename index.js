const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log("It didn't work!" , err);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('132.52.64.229', (err, coordsByIP) => {
  if (err) {
    console.log("It didn't work!" , err);
    return;
  }

  console.log('It worked! Returned coordinates (by IP):' , coordsByIP);
});