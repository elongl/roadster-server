import executeQuery from '../helpers/executeQuery';
import UserDetails from '../ORM/UserDetails';

export default function addUser(user: UserDetails) {
  const { displayName, oauthId, oauthProvider } = user;
  const query = {
    text: `WITH userinsert AS (INSERT INTO users(display_name) VALUES ($1, $2, $3) RETURNING id)
           INSERT INTO oauth(user_id, oauth_id, oauth_provider) VALUES ((SELECT id FROM userinsert), $4, $5);`,
    values: [displayName, oauthId, oauthProvider]
  };
  executeQuery(query);
}
