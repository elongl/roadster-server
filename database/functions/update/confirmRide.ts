import executeQuery from '../../helpers/executeQuery';

export default async function confirmRide(rideId: number) {
  const query = {
    text: `UPDATE rides SET status = 'live' WHERE id=$1`,
    values: [rideId]
  };
  await executeQuery(query);
}
