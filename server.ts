require('dotenv').config();
import express from 'express';
import addRide from './database/functions/addRide';
import matchDriver from './database/functions/matchDriver';
import availableDrivers from './database/views/availableDrivers';
import authRoutes from './authentication/authRoutes';
import waitingRides from './database/views/waitingRides';
import authConfig from './authentication/authConfig';
import RideDetails from './database/typings/RideDetails';
import MatchedDriver from './database/typings/MatchedDriver';
import UserDetails from './database/typings/UserDetails';
import middlewares from './middlewares';
import updateUser from './database/functions/updateUser';
import findUserById from './database/functions/findUserById';
import getRide from './database/functions/getRide';
const app = express();
authConfig();

app.use(middlewares);
app.use('/auth', authRoutes);

app.post('/ride', (req, res) => {
  const ride: RideDetails = req.body;
  addRide(ride).then(() => res.sendStatus(200), err => res.send(err));
});

app.patch('/matchdriver', (req, res) => {
  const matchedDriver: MatchedDriver = req.body;
  matchDriver(matchedDriver).then(() => res.sendStatus(200), err => res.send(err));
});

app.patch('/user', (req, res) => {
  const changedProperties = req.body;
  const userId = req.user && req.user.id;
  updateUser(userId, changedProperties).then(
    () => res.sendStatus(200),
    err => res.send(err)
  );
});

app.get('/availabledrivers', (req, res) => {
  availableDrivers().then(
    (drivers: UserDetails[] | undefined) => res.send(drivers),
    err => res.send(err)
  );
});

app.get('/waitingrides', (req, res) => {
  waitingRides().then(
    (rides: RideDetails[] | undefined) => res.send(rides),
    err => res.send(err)
  );
});

app.get('/user/:id', async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user === undefined) res.status(404).send('User was not found.');
  res.send(user);
});

app.get('/ride/:id', async (req, res) => {
  getRide(req.params.id).then(ride => res.send(ride), err => res.status(404).send(err));
});

app.listen(8080, () => console.log('Listening on port 8080...'));
