import executeQuery from '../helpers/executeQuery';
import MatchedDriver from '../typings/MatchedDriver';

export default async function matchDriver(
  driverId: number,
  matchedDriver: MatchedDriver
) {
  const { rideId } = matchedDriver;
  const query = {
    text: "UPDATE rides SET driver_id=$2, status='In Progress' WHERE id=$1;",
    values: [rideId, driverId]
  };
  await executeQuery(query);
}
