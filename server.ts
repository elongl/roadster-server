import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import addRide from './database/functions/addRide';
import matchDriver from './database/functions/matchDriver';
import availableDrivers from './database/views/availableDrivers';
import authRoutes from './authentication/authRoutes';
import waitingRides from './database/views/waitingRides';
import closestRides from './database/views/closestRides';
import authConfig from './authentication/authConfig';
import RideDetails from './database/ORM/RideDetails';
import Location from './database/ORM/Location';
import MatchedDriver from './database/ORM/MatchedDriver';
import middlewares from './middlewares';
import UserDetails from './database/ORM/UserDetails';
const app = express();
authConfig();

app.use(middlewares);
app.use('/auth', authRoutes);

app.post('/ride', (req, res) => {
  const ride: RideDetails = req.body;
  addRide(ride).then(() => res.send(200), (err: Error) => res.send(err));
});

app.patch('/matchdriver', (req, res) => {
  const matchedDriver: MatchedDriver = req.body;
  matchDriver(matchedDriver).then(
    () => res.send(200),
    (err: Error) => res.send(err)
  );
});

app.get('/availabledrivers', (req, res) => {
  availableDrivers().then(
    (drivers: UserDetails[] | undefined) => res.send(drivers),
    (err: Error) => res.send(err)
  );
});

app.get('/waitingrides', (req, res) => {
  waitingRides().then(
    (rides: RideDetails[] | undefined) => res.send(rides),
    (err: Error) => res.send(err)
  );
});

app.get('/closestrides/:longitude/:latitude', (req, res) => {
  const location: Location = req.params;
  closestRides(location).then(
    (rides: RideDetails[] | undefined) => res.send(rides),
    (err: Error) => res.send(err)
  );
});

app.listen(8080, () => console.log('Listening on port 8080...'));
