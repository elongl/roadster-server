import OAuthUserDetails from '../typing/OAuthUserDetails';
import executeQuery from '../helpers/executeQuery';
import UserDetails from '../typing/UserDetails';
export default async function findUserById(
  user: OAuthUserDetails
): Promise<UserDetails | undefined> {
  const query = {
    text:
      'SELECT * FROM users WHERE id IN (SELECT user_id FROM oauth WHERE oauth_id=$1 AND oauth_provider=$2);',
    values: [user.oauthId, user.oauthProvider]
  };
  const identifiedUser = await executeQuery(query);
  if (identifiedUser) return identifiedUser[0];
  return undefined;
}
