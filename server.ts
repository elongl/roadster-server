require('dotenv').config({ path: '.env.development' });
import findUserById from './database/functions/read/findUserById';
import matchDriver from './database/functions/update/matchDriver';
import getUserRide from './database/functions/read/getUserRide';
import deleteRideByUserId from './database/functions/delete/deleteRideByUserId';
import updateUser from './database/functions/update/updateUser';
import addRide from './database/functions/create/addRide';
import waitingRides from './database/views/waitingRides';
import getRide from './database/functions/read/getRide';
import authRoutes from './authentication/authRoutes';
import authConfig from './authentication/authConfig';
import middlewares from './middlewares';
import io from 'socket.io';
import express from 'express';
import http from 'http';
import getUserDrive from './database/functions/read/getUserDrive';
import confirmRide from './database/functions/update/confirmRide';
import completeRide from './database/functions/update/completeRide';
import unmatchDriver from './database/functions/update/unmatchDriver';
const app = express();
const server = http.createServer(app);
const socket = io.listen(server);
authConfig();

app.use(middlewares);
app.use('/auth', authRoutes);

app.post('/ride', (req, res) => {
  const ride = req.body;
  const riderId = req.user && req.user.id;
  addRide(riderId, ride).then(
    ride => {
      socket.emit('rideslist_changed');
      res.send(ride);
    },
    err => res.send(err)
  );
});

app.post('/confirm', async (req, res) => {
  const userId = req.user && req.user.id;
  const { id: rideId } = await getUserRide(userId);
  confirmRide(rideId).then(
    () => {
      socket.emit(`confirm/${rideId}`);
      res.sendStatus(200);
    },
    err => res.send(err)
  );
});

app.patch('/completeride', async (req, res) => {
  const userId = req.user && req.user.id;
  try {
    const { id: rideId } = await getUserRide(userId);
    completeRide(rideId).then(
      () => {
        socket.emit(`complete/${rideId}`);
        res.sendStatus(200);
      },
      err => res.send(err)
    );
  } catch (ex) {
    const { id: rideId } = await getUserDrive(userId);
    completeRide(rideId).then(
      () => {
        socket.emit(`complete/${rideId}`);
        res.sendStatus(200);
      },
      err => res.send(err)
    );
  }
});

app.patch('/matchdriver', (req, res) => {
  const { rideId } = req.body;
  const driverId = req.user && req.user.id;
  matchDriver(driverId, rideId).then(
    () => {
      socket.emit(`matchdriver/${rideId}`);
      socket.emit('rideslist_changed');
      res.sendStatus(200);
    },
    err => res.send(err)
  );
});

app.patch('/unmatchdriver', async (req, res) => {
  const driverId = req.user && req.user.id;
  const { id: rideId } = await getUserDrive(driverId);
  unmatchDriver(rideId).then(
    () => {
      socket.emit(`unmatchdriver/${rideId}`);
      socket.emit('rideslist_changed');
      res.sendStatus(200);
    },
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

app.delete('/ride', async (req, res) => {
  const userId = req.user && req.user.id;
  const { id: rideId } = await getUserRide(userId);
  deleteRideByUserId(userId).then(
    () => {
      socket.emit(`cancel/${rideId}`);
      socket.emit('rideslist_changed');
      res.sendStatus(200);
    },
    err => res.send(err)
  );
});

app.get('/waitingrides', (req, res) => {
  waitingRides().then(rides => res.send(rides), err => res.send(err));
});

app.get('/user/:id', (req, res) => {
  findUserById(req.params.id).then(
    user => res.send(user),
    err => res.status(404).send(err)
  );
});

app.get('/ride/:id', (req, res) => {
  getRide(req.params.id).then(ride => res.send(ride), err => res.status(404).send(err));
});

app.get('/userride/:userid', (req, res) => {
  getUserRide(req.params.userid).then(
    ride => res.send(ride),
    err => res.status(404).send(err)
  );
});

app.get('/userdrive', (req, res) => {
  const userId = req.user && req.user.id;
  getUserDrive(userId).then(ride => res.send(ride), err => res.status(404).send(err));
});
console.clear();
server.listen(8080, () => console.log('Listening on port 8080...'));
