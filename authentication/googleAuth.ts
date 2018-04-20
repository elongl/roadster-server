import passport from 'passport';
import OAuthUserDetails from '../database/ORM/OAuthUserDetails';
import {
  OAuth2Strategy as googleAuth,
  IOAuth2StrategyOption
} from 'passport-google-oauth';

export default function regusterGoogleStrategy() {
  const googleConfig: IOAuth2StrategyOption = {
    clientID: process.env.GOOGLE_CLIENT_ID || 'client id undefined',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'client secret undefined',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'callback url undefined'
  };

  passport.use(
    new googleAuth(googleConfig, (accessToken, refreshToken, profile, done) => {
      const user: OAuthUserDetails = {
        displayName: profile.displayName,
        oauthId: profile.id,
        oauthProvider: profile.provider
      };
      console.log(user);
      done(null, user);
    })
  );
}
