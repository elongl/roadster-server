import { Client } from 'pg';
import { toCamelCase } from '../../utils/mapObject';
export default async function executeQuery(query: Query) {
  const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_SSL, NODE_ENV } = process.env;
  const developmentClient = { database: 'roadster' };
  const productionClient = {
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    ssl: Boolean(DB_SSL)
  };
  const client = new Client(
    NODE_ENV === 'production' ? productionClient : developmentClient
  );

  await client.connect();
  const res = await client.query(query);
  await client.end();
  return res.rows.map(row => toCamelCase(row));
}

interface Query {
  text: string;
  values?: any[];
}
