import executeQuery from '../helpers/executeQuery';
import RideDetails from '../typings/RideDetails';
export default async function waitingRides() {
  const query = {
    text: "SELECT id, rider_id, origin, destination FROM rides WHERE status = 'waiting';"
  };
  return (await executeQuery(query)) as RideDetails[];
}
