import executeQuery from '../helpers/executeQuery';
import UserDetails from '../ORM/UserDetails';

export default function addUser(user: UserDetails) {
  const {
    displayName,
    phoneNumber,
    avatar,
    isDriver,
    oauthId,
    oauthProvider
  } = user;
  const query = {
    text: `WITH userinsert AS (INSERT INTO users(display_name, phone_number, is_driver, avatar) VALUES ($1, $2, $3, $4) RETURNING id)
           INSERT INTO oauth(user_id, oauth_id, oauth_provider) VALUES ((SELECT id FROM userinsert), $5, $6);`,
    values: [displayName, phoneNumber, isDriver, avatar, oauthId, oauthProvider]
  };
  executeQuery(query);
}
