import passport, { Profile } from 'passport';
import OAuthUserDetails from '../database/types/OAuthUserDetails';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { googleConfig, facebookConfig, twitterConfig } from './authConfig';
import addUser from '../database/functions/create/addUser';
import UserDetails from '../database/types/UserDetails';
import findUserByOAuth from '../database/functions/read/findUserByOAuth';

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
  let avatar = profile.photos && profile.photos[0].value;
  if (avatar) {
    if (authUser.oauthProvider === 'google') {
      avatar = avatar.substring(0, avatar.indexOf('?')) + '?sz=200';
    } else if (authUser.oauthProvider === 'twitter') {
      avatar = avatar.replace('_normal', '');
    }
  }
  const user: UserDetails = {
    displayName: profile.displayName,
    avatar
  };

  findUserByOAuth(authUser).catch(() => addUser(user, authUser));
  done(null, authUser);
}
