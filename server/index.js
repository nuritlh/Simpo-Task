const express = require('express');
const bodyParser = require('body-parser');
const { getEarthquakes } = require('./services/api');

const PORT = 1234;
const app = express();

app.use(bodyParser.json());

// Allow CORS
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  next();
});

app.get('/', (req, res) => {
  res.json({ where: 'world Robi22' });
});

app.get('/earthquakes', (req, res) => {
  res.json({ where: 'world get' });
});

app.post('/earthquakes', async (req, res) => {
  let query = req.body.query;
  // in a real app I would add validation for query startDate, endDate, magnitude, latitude, longitude, radius
  const results =  await getEarthquakes(query);
  res.json(results);
});

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});