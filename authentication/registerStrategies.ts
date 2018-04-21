import passport, { Profile } from 'passport';
import OAuthUserDetails from '../database/ORM/OAuthUserDetails';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { googleConfig, facebookConfig, twitterConfig } from './authConfig';

export default function registerStrategies() {
  passport.use(new GoogleStrategy(googleConfig, verify));
  passport.use(new FacebookStrategy(facebookConfig, verify));
  passport.use(new TwitterStrategy(twitterConfig, verify));
}

const verify = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any) => void
) => {
  const user: OAuthUserDetails = {
    oauthId: profile.id,
    oauthProvider: profile.provider
  };
  done(null, user);
};
