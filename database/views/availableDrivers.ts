import executeQuery from '../helpers/executeQuery';
export default async function availableDrivers() {
  const query = { text: 'SELECT * FROM available_drivers;' };
  return await executeQuery(query);
}
