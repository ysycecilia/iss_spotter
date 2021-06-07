const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log("It didn't work!" , err);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('174.89.35.4', (err, coordsByIP) => {
  if (err) {
    console.log("It didn't work!" , err);
    return;
  }

  console.log('It worked! Returned coordinates (by IP):' , coordsByIP);
});

const myCoords = { latitude: 43.6694, longitude: -79.4018 };

fetchISSFlyOverTimes(myCoords, (err, flyOverTime) => {
  if (err) {
    console.log("It didn't work!" , err);
    return;
  }

  console.log('It worked! Returned time:' , flyOverTime);
});


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});