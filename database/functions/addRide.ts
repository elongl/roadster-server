import executeQuery from '../helpers/executeQuery';
import RideDetails from '../typings/RideDetails';

export default async function addRide(riderId: number, ride: Partial<RideDetails>) {
  const { origin, destination } = ride;
  const query = {
    text:
      "INSERT INTO rides(rider_id, origin, destination, status) values ($1, $2, $3, 'waiting');",
    values: [riderId, origin, destination]
  };
  await executeQuery(query);
}
