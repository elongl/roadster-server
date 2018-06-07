import executeQuery from '../../helpers/executeQuery';

export default async function unmatchDriver(rideId: number) {
  const query = {
    text: "UPDATE rides SET driver_id=null, status='waiting' WHERE id=$1;",
    values: [rideId]
  };
  await executeQuery(query);
}
