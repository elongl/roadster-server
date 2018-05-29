import executeQuery from '../../helpers/executeQuery';

export default async function deleteRide(riderId: number) {
  const query = {
    text: 'DELETE FROM rides WHERE rider_id = $1',
    values: [riderId]
  };
  await executeQuery(query);
}
