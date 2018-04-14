import { Client } from 'pg';
export default async function executeQuery(query: Query) {
  const client = new Client({ database: 'roadster' });
  try {
    await client.connect();
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

interface Query {
  text: string;
  values?: any[];
}
