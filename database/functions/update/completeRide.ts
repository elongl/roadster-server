import executeQuery from '../../helpers/executeQuery';

export default async function completeRide(rideId: number) {
  const query = {
    text: `UPDATE rides SET status = 'complete' WHERE id=$1`,
    values: [rideId]
  };
  await executeQuery(query);
}
