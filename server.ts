import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import addRide from './database/functions/addRide';
import matchDriver from './database/functions/matchDriver';
import availableDrivers from './database/views/availableDrivers';
import authRoutes from './authentication/routes';
import waitingRides from './database/views/waitingRides';
import closestRides from './database/views/closestRides';
import authConfig from './authentication/authConfig';
import RideDetails from './database/ORM/RideDetails';
import Location from './database/ORM/Location';
import MatchedDriver from './database/ORM/MatchedDriver';
import middlewares from './middlewares';
const app = express();
authConfig();

app.use(middlewares);
app.use('/auth', authRoutes);

app.post('/ride', (req, res) => {
  const ride: RideDetails = req.body;
  addRide(ride);
});

app.patch('/matchdriver', (req, res) => {
  const matchedDriver: MatchedDriver = req.body;
  matchDriver(matchedDriver);
});

app.get('/availabledrivers', async (req, res) => {
  const drivers = await availableDrivers();
  res.send(drivers);
});

app.get('/waitingrides', async (req, res) => {
  const rides = await waitingRides();
  res.send(rides);
});

app.get('/closestrides/:longitude/:latitude', async (req, res) => {
  const location: Location = req.params;
  const rides = await closestRides(location);
  res.send(rides);
});

app.listen(8080, () => console.log('Listening on port 8080...'));
