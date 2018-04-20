import OAuthUserDetails from '../database/ORM/OAuthUserDetails';
import googleAuth from './googleAuth';
import facebookAuth from './facebookAuth';
import passport from 'passport';
import twitterAuth from './twitterAuth';
export default function config() {
  passport.serializeUser((user: OAuthUserDetails, done) => {
    console.log('Serializing', user);
    done(null, { oauthId: user.oauthId, oauthProvider: user.oauthProvider });
  });

  passport.deserializeUser((user, done) => {
    // Make query to retrieve actual user.
    console.log('Deserializing', user);
    done(null, user);
  });

  googleAuth();
  facebookAuth();
  twitterAuth();
}
