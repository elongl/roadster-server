import executeQuery from '../helpers/executeQuery';
import MatchedDriver from '../ORM/MatchedDriver';

export default function matchDriver(matchedDriver: MatchedDriver) {
  const { rideId, driverId } = matchedDriver;
  const query = {
    text: "UPDATE rides SET driver_id=$2, status='In Progress' WHERE id=$1;",
    values: [rideId, driverId]
  };
  executeQuery(query);
}
