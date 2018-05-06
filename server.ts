require('dotenv').config();
import express from 'express';
import addRide from './database/functions/addRide';
import matchDriver from './database/functions/matchDriver';
import availableDrivers from './database/views/availableDrivers';
import authRoutes from './authentication/authRoutes';
import waitingRides from './database/views/waitingRides';
import closestRides from './database/views/closestRides';
import authConfig from './authentication/authConfig';
import RideDetails from './database/typings/RideDetails';
import Location from './database/typings/Location';
import MatchedDriver from './database/typings/MatchedDriver';
import UserDetails from './database/typings/UserDetails';
import middlewares from './middlewares';
const app = express();
authConfig();

app.use(middlewares);
app.use('/auth', authRoutes);

app.post('/ride', (req, res) => {
  const ride: RideDetails = req.body;
  addRide(ride).then(() => res.sendStatus(200), err => res.send(err.message));
});

app.patch('/matchdriver', (req, res) => {
  const matchedDriver: MatchedDriver = req.body;
  matchDriver(matchedDriver).then(
    () => res.sendStatus(200),
    err => res.send(err.meesage)
  );
});

app.get('/availabledrivers', (req, res) => {
  availableDrivers().then(
    (drivers: UserDetails[] | undefined) => res.send(drivers),
    err => res.send(err.message)
  );
});

app.get('/waitingrides', (req, res) => {
  waitingRides().then(
    (rides: RideDetails[] | undefined) => res.send(rides),
    err => res.send(err.message)
  );
});

app.get('/closestrides/:longitude/:latitude', (req, res) => {
  const location: Location = req.params;
  closestRides(location).then(
    (rides: RideDetails[] | undefined) => res.send(rides),
    err => res.send(err.message)
  );
});

app.listen(8080, () => console.log('Listening on port 8080...'));
