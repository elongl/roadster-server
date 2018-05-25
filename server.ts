require('dotenv').config();
import express from 'express';
import addRide from './database/functions/addRide';
import matchDriver from './database/functions/matchDriver';
import availableDrivers from './database/views/availableDrivers';
import authRoutes from './authentication/authRoutes';
import waitingRides from './database/views/waitingRides';
import authConfig from './authentication/authConfig';
import middlewares from './middlewares';
import updateUser from './database/functions/updateUser';
import findUserById from './database/functions/findUserById';
import getRide from './database/functions/getRide';
const app = express();
authConfig();

app.use(middlewares);
app.use('/auth', authRoutes);

app.post('/ride', (req, res) => {
  const ride = req.body;
  const riderId = req.user && req.user.id;
  addRide(riderId, ride).then(() => res.sendStatus(200), err => res.send(err));
});

app.patch('/matchdriver', (req, res) => {
  const matchedDriver = req.body;
  const driverId = req.user && req.user.id;
  matchDriver(driverId, matchedDriver).then(
    () => res.sendStatus(200),
    err => res.send(err)
  );
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
  availableDrivers().then(drivers => res.send(drivers), err => res.send(err));
});

app.get('/waitingrides', (req, res) => {
  waitingRides().then(rides => res.send(rides), err => res.send(err));
});

app.get('/user/:id', (req, res) => {
  findUserById(req.params.id).then(user => res.send(user), err => res.send(err));
});

app.get('/ride/:id', async (req, res) => {
  getRide(req.params.id).then(ride => res.send(ride), err => res.status(404).send(err));
});

app.listen(8080, () => console.log('Listening on port 8080...'));
