import executeQuery from '../helpers/executeQuery';
export default async function getRide(id: number) {
  const query = {
    text: 'SELECT * FROM rides WHERE id = $1',
    values: [id]
  };
  const ride = await executeQuery(query);
  if (ride.length) return ride[0];
  throw 'Ride was not found.';
}
