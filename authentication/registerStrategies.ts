import passport, { Profile } from 'passport';
import OAuthUserDetails from '../database/ORM/OAuthUserDetails';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { googleConfig, facebookConfig, twitterConfig } from './authConfig';
import addUser from '../database/functions/addUser';
import UserDetails from '../database/ORM/UserDetails';

export default function registerStrategies() {
  passport.use(new GoogleStrategy(googleConfig, verify));
  passport.use(new FacebookStrategy(facebookConfig, verify));
  passport.use(new TwitterStrategy(twitterConfig, verify));
}

function verify(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any) => void
) {
  console.log(profile);
  // const authUser: OAuthUserDetails = {
  //   oauthId: profile.id,
  //   oauthProvider: profile.provider
  // };
  // const user: UserDetails = {
  //   displayName: profile.displayName,
  //   avatar: profile.photos && profile.photos[0].value
  // };
}
