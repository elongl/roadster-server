import executeQuery from '../helpers/executeQuery';
export default async function waitingRides() {
  const query = { text: 'SELECT * FROM waiting_rides;' };
  return await executeQuery(query);
}
