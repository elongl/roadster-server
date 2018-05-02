import OAuthUserDetails from '../database/typing/OAuthUserDetails';
import passport from 'passport';
import { IOAuth2StrategyOption as GoogleOption } from 'passport-google-oauth';
import { StrategyOption as FacebookOption } from 'passport-facebook';
import { IStrategyOption as TwitterOption } from 'passport-twitter';
import registerStrategies from './registerStrategies';
import findUserById from '../database/functions/findUserById';

export default function config() {
  passport.serializeUser((user: OAuthUserDetails, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (authUser: OAuthUserDetails, done) => {
    const user = await findUserById(authUser);
    done(null, user);
  });
  registerStrategies();
}

export const googleConfig: GoogleOption = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'client id undefined',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'client secret undefined',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'callback url undefined'
};

export const facebookConfig: FacebookOption = {
  clientID: process.env.FACEBOOK_CLIENT_ID || 'client id undefined',
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'client secret undefined',
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'callback url undefined'
};

export const twitterConfig: TwitterOption = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY || 'consumer key undefined',
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'consumer secret undefined',
  callbackURL: process.env.TWITTER_CALLBACK_URL || 'callback url undefined'
};
