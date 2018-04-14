import passport from 'passport';
import {
  OAuth2Strategy as googleAuth,
  IOAuth2StrategyOption
} from 'passport-google-oauth';

const googleConfig: IOAuth2StrategyOption = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'google client id undefined',
  clientSecret:
    process.env.GOOGLE_CLIENT_SECRET || 'google client secret undefined',
  callbackURL:
    process.env.GOOGLE_CALLBACK_URL || 'google callback url undefined'
};

export default function regusterGoogleStrategy() {
  passport.use(
    new googleAuth(googleConfig, (accessToken, refreshToken, profile, done) => {
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
      console.log('Profile:', profile);
      console.log('Done:', done);
    })
  );
}
