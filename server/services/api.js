const axios = require('axios');

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&';

const getEarthquakes = ({ startDate, endDate, magnitude, latitude, longitude, radius }) => {
  const query = `starttime=${startDate}&endtime=${endDate}&minmagnitude=${magnitude}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}`;
  const url = baseUrl+query;
  return axios.get(url, {
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error)
    });
};

module.exports = {
  getEarthquakes
};