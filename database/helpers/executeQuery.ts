import { Client } from 'pg';
import { toCamelCase } from '../../utils/mapObject';
export default async function executeQuery(query: Query) {
  const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE || 'roadster',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  await client.connect();
  const res = await client.query(query).finally(() => client.end());
  return res.rows.map(row => toCamelCase(row));
}

interface Query {
  text: string;
  values?: any[];
}
