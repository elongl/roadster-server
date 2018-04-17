import executeQuery from '../helpers/executeQuery';
import RideDetails from '../ORM/RideDetails';

export default function addRide(ride: RideDetails) {
  const { riderId, startPoint, endPoint } = ride;
  const query = {
    text:
      "INSERT INTO rides(rider_id, start_point, end_point, status) values ($1, $2, $3, 'Waiting');",
    values: [
      riderId,
      `(${startPoint.longitude}, ${startPoint.latitude})`,
      `(${endPoint.longitude}, ${endPoint.latitude})`
    ]
  };
  executeQuery(query);
}
