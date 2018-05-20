import executeQuery from '../helpers/executeQuery';
export default async function waitingRides() {
  const query = { text: 'SELECT * FROM waiting_rides;' };
  return (await executeQuery(query)).map(ride => ({
    ...ride,
    origin: { latitude: ride.origin.x, longitude: ride.origin.y },
    destination: { latitude: ride.destination.x, longitude: ride.destination.y }
  }));
}
