import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
const middlewares = [
  cors({ origin: process.env.CLIENT_URL, credentials: true }),
  bodyParser.json(),
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    secret: 'My Secret World'
  }),
  passport.initialize(),
  passport.session()
];
export default middlewares;
