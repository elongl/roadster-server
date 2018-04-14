import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import addUser, { UserDetails } from './database/functions/addUser';
import addRide, { RideDetails, Location } from './database/functions/addRide';
import matchDriver, { MatchedDriver } from './database/functions/matchDriver';
import availableDrivers from './database/views/availableDrivers';
import waitingRides from './database/views/waitingRides';
import closestRides from './database/views/closestRides';
import registerStrategies from './authentication/registerStrategies';
const app = express();

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
registerStrategies();

app.post('/user', (req, res) => {
  const user: UserDetails = req.body;
  addUser(user);
});

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

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.listen(8080, () => console.log('Listening on port 8080...'));
