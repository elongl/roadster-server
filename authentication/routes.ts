import express from 'express';
import passport from 'passport';
const app = express.Router();

// Add success / failure redirects.
app.get('/user', (req, res) => {
  res.send(req.user);
});

app.get('/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect(process.env.CLIENT_URL as string);
});

app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res.redirect(process.env.CLIENT_URL as string);
});

app.get('/twitter', passport.authenticate('twitter'));
app.get('/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  res.redirect(process.env.CLIENT_URL as string);
});

export default app;
