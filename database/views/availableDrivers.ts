import executeQuery from '../helpers/executeQuery';
import UserDetails from '../typings/UserDetails';
export default async function availableDrivers() {
  const query = { text: 'SELECT * FROM available_drivers;' };
  return (await executeQuery(query)) as UserDetails[];
}
