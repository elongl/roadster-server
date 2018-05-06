import passport, { Profile } from 'passport';
import OAuthUserDetails from '../database/typings/OAuthUserDetails';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { googleConfig, facebookConfig, twitterConfig } from './authConfig';
import addUser from '../database/functions/addUser';
import UserDetails from '../database/typings/UserDetails';
import findUserById from '../database/functions/findUserById';

export default function registerStrategies() {
  passport.use(new GoogleStrategy(googleConfig, verify));
  passport.use(new FacebookStrategy(facebookConfig, verify));
  passport.use(new TwitterStrategy(twitterConfig, verify));
}

async function verify(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any) => void
) {
  const authUser: OAuthUserDetails = {
    oauthId: profile.id,
    oauthProvider: profile.provider
  };
  const user: UserDetails = {
    displayName: profile.displayName,
    avatar: profile.photos && profile.photos[0].value
  };
  const existingUser = await findUserById(authUser);
  if (!existingUser) addUser(user, authUser);
  done(null, authUser);
}
