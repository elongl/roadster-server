import executeQuery from '../helpers/executeQuery';
import RideDetails from '../typings/RideDetails';
export default async function waitingRides() {
  const query = { text: 'SELECT * FROM waiting_rides;' };
  return (await executeQuery(query)) as RideDetails[];
}
