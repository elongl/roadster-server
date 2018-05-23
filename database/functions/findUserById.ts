import executeQuery from '../helpers/executeQuery';
export default async function findUserById(id: number) {
  const query = {
    text: 'SELECT * FROM users WHERE id=$1;',
    values: [id]
  };

  const user = await executeQuery(query);
  if (user.length) return user[0];
  return Promise.reject('User was not found.');
}
