import executeQuery from '../helpers/executeQuery';
import RideDetails from '../typings/RideDetails';

export default async function addRide(ride: RideDetails) {
  const { riderId, startPoint, endPoint } = ride;
  const query = {
    text:
      "INSERT INTO rides(rider_id, start_point, end_point, status) values ($1, $2, $3, 'Waiting');",
    values: [
      riderId,
      `(${startPoint.latitude}, ${startPoint.longitude})`,
      `(${endPoint.latitude}, ${endPoint.longitude})`
    ]
  };
  await executeQuery(query);
}
