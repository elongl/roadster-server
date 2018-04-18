import passport from 'passport';
import addUser from '../database/functions/addUser';
import OAuthUserDetails from '../database/ORM/OAuthUserDetails';
import {
  OAuth2Strategy as googleAuth,
  IOAuth2StrategyOption
} from 'passport-google-oauth';
import executeQuery from '../database/helpers/executeQuery';

export default function regusterGoogleStrategy() {
  const googleConfig: IOAuth2StrategyOption = {
    clientID: process.env.GOOGLE_CLIENT_ID || 'client id undefined',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'client secret undefined',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'callback url undefined'
  };

  passport.use(
    new googleAuth(
      googleConfig,
      async (accessToken, refreshToken, profile, done) => {
        const user: OAuthUserDetails = {
          displayName: profile.displayName,
          oauthId: profile.id,
          oauthProvider: profile.provider
        };
        const query = {
          text: 'SELECT * FROM oauth WHERE oauth_id=$1 AND oauth_provider=$2',
          values: [user.oauthId, user.oauthProvider]
        };
        const result = await executeQuery(query);
        if (result && !Boolean(result.length)) addUser(user);
        done(null, user);
      }
    )
  );
}
