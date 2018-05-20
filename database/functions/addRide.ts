import executeQuery from '../helpers/executeQuery';
import RideDetails from '../typings/RideDetails';

export default async function addRide(ride: RideDetails) {
  const { riderId, origin, destination } = ride;
  const query = {
    text:
      "INSERT INTO rides(rider_id, origin, destination, status) values ($1, $2, $3, 'Waiting');",
    values: [
      riderId,
      `(${origin.latitude}, ${origin.longitude})`,
      `(${destination.latitude}, ${destination.longitude})`
    ]
  };
  await executeQuery(query);
}
