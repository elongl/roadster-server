import executeQuery from '../helpers/executeQuery';
import MatchedDriver from '../typings/MatchedDriver';

// Make sure rideId comes from the user session.
export default async function matchDriver(matchedDriver: MatchedDriver) {
  const { rideId, driverId } = matchedDriver;
  const query = {
    text: "UPDATE rides SET driver_id=$2, status='In Progress' WHERE id=$1;",
    values: [rideId, driverId]
  };
  await executeQuery(query);
}
