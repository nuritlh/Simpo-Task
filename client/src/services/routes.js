import axios from 'axios';

const baseUrl = 'http://localhost:1234';

export const getEarthquakes = (query) => {
  return axios.post(`${baseUrl}/earthquakes`, {query
  }).then((res) => {
    return res.data;
  })
};

export default {
  getEarthquakes
};
