require('dotenv').config();
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
import socket from 'socket.io';
import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app);
const io = socket.listen(server);
authConfig();

io.on('connection', socket => console.log('hey'));

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

app.delete('/ride', (req, res) => {
  const userId = req.user && req.user.id;
  deleteRideByUserId(userId).then(() => res.sendStatus(200), err => res.send(err));
});

console.clear();
server.listen(8080, () => console.log('Listening on port 8080...'));
