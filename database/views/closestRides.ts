import { Location } from '../functions/addRide';
import executeQuery from '../helpers/executeQuery';
export default async function closestRides(location: Location) {
  const query = {
    text:
      'SELECT *, (point($1, $2)<@>start_point) * 1.60934 AS distance FROM waiting_rides ORDER BY distance;',
    values: [location.longitude, location.latitude]
  };
  return await executeQuery(query);
}
