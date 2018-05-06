import OAuthUserDetails from '../typings/OAuthUserDetails';
import executeQuery from '../helpers/executeQuery';
export default async function findUserById(user: OAuthUserDetails) {
  const query = {
    text:
      'SELECT * FROM users WHERE id IN (SELECT user_id FROM oauth WHERE oauth_id=$1 AND oauth_provider=$2);',
    values: [user.oauthId, user.oauthProvider]
  };

  const identifiedUser = await executeQuery(query);
  if (identifiedUser.length) return identifiedUser[0];
  return Promise.reject('User was not found.');
}
