import Location from '../typings/Location';
import executeQuery from '../helpers/executeQuery';
export default async function closestRides(location: Location) {
  const query = {
    text:
      'SELECT *, (point($1, $2)<@>origin) * 1.60934 AS distance FROM waiting_rides ORDER BY distance;',
    values: [location.latitude, location.longitude]
  };
  return await executeQuery(query);
}
