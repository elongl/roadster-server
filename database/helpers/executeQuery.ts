import { Client } from 'pg';
export default async function executeQuery(query: Query) {
  const client = new Client({ database: 'roadster' });
  await client.connect();
  const res = await client.query(query).finally(() => client.end());
  return res.rows;
}

interface Query {
  text: string;
  values?: any[];
}
