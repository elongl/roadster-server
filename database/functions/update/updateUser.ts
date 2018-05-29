import UserDetails from '../../typings/UserDetails';
import objectToString from '../../../utils/objectToString';
import executeQuery from '../../helpers/executeQuery';

export default async function updateUser(
  userId: number,
  changedProperties: Partial<UserDetails>
) {
  const query = {
    text: `UPDATE users SET ${objectToString(changedProperties)} WHERE id=$1`,
    values: [userId]
  };
  await executeQuery(query);
}
