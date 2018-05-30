import executeQuery from '../../helpers/executeQuery';

export default async function unmatchDriver(driverId: number) {
  const query = {
    text: "UPDATE rides SET driver_id=null, status='waiting' WHERE driver_id=$1;",
    values: [driverId]
  };
  await executeQuery(query);
}
