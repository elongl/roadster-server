import express from 'express';
import passport from 'passport';
const app = express.Router();

app.get('/user', (req, res) => {
  if (req.user === undefined) res.sendStatus(401);
  else res.send(req.user);
});
const redirectObject = {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: process.env.CLIENT_URL + '/login'
};

app.get('/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/google/callback', passport.authenticate('google', redirectObject));

app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback', passport.authenticate('facebook', redirectObject));

app.get('/twitter', passport.authenticate('twitter'));
app.get('/twitter/callback', passport.authenticate('twitter', redirectObject));

export default app;
