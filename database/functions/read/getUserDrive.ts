import executeQuery from '../../helpers/executeQuery';
export default async function getUserDrive(userId: number) {
  const query = {
    text: "SELECT * FROM rides WHERE driver_id = $1 AND status != 'complete'",
    values: [userId]
  };
  const ride = await executeQuery(query);
  if (ride.length) return ride[0];
  throw 'Ride was not found.';
}
