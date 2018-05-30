import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
const middlewares = [
  cors({
    origin: [`${process.env.CLIENT_URL}`, 'https://roadster.netlify.com'],
    credentials: true
  }),
  bodyParser.json(),
  cookieSession({
    name: 'user-session',
    maxAge: 10 * 365 * 24 * 60 * 60 * 100,
    secret: 'My Secret World'
  }),
  passport.initialize(),
  passport.session()
];
export default middlewares;
