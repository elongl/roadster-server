import executeQuery from '../helpers/executeQuery';
export default async function waitingRides() {
  const query = { text: 'SELECT * FROM waiting_rides;' };
  return (await executeQuery(query)).map(ride => ({
    ...ride,
    startPoint: { longitude: ride.startPoint.x, latitude: ride.endPoint.y },
    endPoint: { longitude: ride.endPoint.x, latitude: ride.endPoint.y }
  }));
}
