import express from 'express';
import passport from 'passport';
const app = express.Router();

app.get('/user', (req, res) => {
  if (req.user === undefined) res.status(401).send('Unable to pull user from session.');
  else res.send(req.user);
});
const redirectObject = {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: process.env.CLIENT_URL + '/login'
};

app.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

app.get(
  '/google',
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login'
  })
);
app.get('/google/callback', passport.authenticate('google', redirectObject));

app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback', passport.authenticate('facebook', redirectObject));

app.get('/twitter', passport.authenticate('twitter'));
app.get('/twitter/callback', passport.authenticate('twitter', redirectObject));

export default app;
