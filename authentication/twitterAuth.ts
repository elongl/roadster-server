import passport from 'passport';
import OAuthUserDetails from '../database/ORM/OAuthUserDetails';
import { Strategy as TwitterStrategy, IStrategyOption } from 'passport-twitter';

export default function twitterAuth() {
  const twitterConfig: IStrategyOption = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'consumer key undefined',
    consumerSecret:
      process.env.TWITTER_CONSUMER_SECRET || 'consumer secret undefined',
    callbackURL: process.env.TWITTER_CALLBACK_URL || 'callback url undefined'
  };

  passport.use(
    new TwitterStrategy(
      twitterConfig,
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
