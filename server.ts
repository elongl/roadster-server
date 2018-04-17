import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import addRide from './database/functions/addRide';
import matchDriver from './database/functions/matchDriver';
import availableDrivers from './database/views/availableDrivers';
import waitingRides from './database/views/waitingRides';
import closestRides from './database/views/closestRides';
import registerStrategies from './authentication/registerStrategies';
import UserDetails from './database/ORM/UserDetails';
import RideDetails from './database/ORM/RideDetails';
import Location from './database/ORM/Location';
import MatchedDriver from './database/ORM/MatchedDriver';

require('dotenv').config();
registerStrategies();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: UserDetails, done) => {
  console.log('Serializing...');
  done(null, user);
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
  (req, res, next) => {
    console.log('Requested');
    next();
  },
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Callback');
    res.redirect('http://localhost:3000');
  }
);

app.listen(8080, () => console.log('Listening on port 8080...'));
