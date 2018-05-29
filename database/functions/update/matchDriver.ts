import executeQuery from '../../helpers/executeQuery';

export default async function matchDriver(driverId: number, rideId: number) {
  const query = {
    text: "UPDATE rides SET driver_id=$2, status='confirming' WHERE id=$1;",
    values: [rideId, driverId]
  };
  await executeQuery(query);
}
