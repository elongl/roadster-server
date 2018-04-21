import OAuthUserDetails from '../database/ORM/OAuthUserDetails';
import passport from 'passport';
import { IOAuth2StrategyOption } from 'passport-google-oauth';
import { StrategyOption } from 'passport-facebook';
import { IStrategyOption } from 'passport-twitter';
import registerStrategies from './registerStrategies';
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

  registerStrategies();
}

export const googleConfig: IOAuth2StrategyOption = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'client id undefined',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'client secret undefined',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'callback url undefined'
};

export const facebookConfig: StrategyOption = {
  clientID: process.env.FACEBOOK_CLIENT_ID || 'client id undefined',
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'client secret undefined',
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'callback url undefined'
};

export const twitterConfig: IStrategyOption = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY || 'consumer key undefined',
  consumerSecret:
    process.env.TWITTER_CONSUMER_SECRET || 'consumer secret undefined',
  callbackURL: process.env.TWITTER_CALLBACK_URL || 'callback url undefined'
};
