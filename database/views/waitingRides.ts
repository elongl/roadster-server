import executeQuery from '../helpers/executeQuery';
export default async function waitingRides() {
  const query = { text: 'SELECT * FROM waiting_rides;' };
  return (await executeQuery(query)).map(ride => ({
    ...ride,
    startPoint: { latitude: ride.startPoint.x, longitude: ride.startPoint.y },
    endPoint: { latitude: ride.endPoint.x, longitude: ride.endPoint.y }
  }));
}
