import executeQuery from '../../helpers/executeQuery';
export default async function getUserRide(userId: number) {
  const query = {
    text: 'SELECT * FROM rides WHERE rider_id = $1',
    values: [userId]
  };
  const ride = await executeQuery(query);
  if (ride.length) return ride[0];
  throw 'Ride was not found.';
}
