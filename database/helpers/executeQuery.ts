import { Client } from 'pg';
import { toCamelCase } from '../../utils/mapObject';
export default async function executeQuery(query: Query) {
  const client = new Client({ database: 'roadster' });
  await client.connect();
  const res = await client.query(query).finally(() => client.end());
  return res.rows.map(row => toCamelCase(row));
}

interface Query {
  text: string;
  values?: any[];
}
