import executeQuery from '../../helpers/executeQuery';
import RideDetails from '../../typings/RideDetails';

export default async function addRide(riderId: number, ride: Partial<RideDetails>) {
  const { origin, destination } = ride;
  const query = {
    text:
      "INSERT INTO rides(rider_id, origin, destination, status) values ($1, $2, $3, 'waiting') RETURNING id;",
    values: [riderId, origin, destination]
  };
  return (await executeQuery(query))[0];
}
