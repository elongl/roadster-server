import passport from 'passport';
import OAuthUserDetails from '../database/ORM/OAuthUserDetails';
import {
  Strategy as FacebookStrategy,
  StrategyOption
} from 'passport-facebook';

export default function facebookAuth() {
  const facebookConfig: StrategyOption = {
    clientID: process.env.FACEBOOK_CLIENT_ID || 'client id undefined',
    clientSecret:
      process.env.FACEBOOK_CLIENT_SECRET || 'client secret undefined',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'callback url undefined'
  };

  passport.use(
    new FacebookStrategy(
      facebookConfig,
      (accessToken, refreshToken, profile, done) => {
        const user: OAuthUserDetails = {
          displayName: profile.displayName,
          oauthId: profile.id,
          oauthProvider: profile.provider
        };
        console.log(user);
        done(null, user);
      }
    )
  );
}
