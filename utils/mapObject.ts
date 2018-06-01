import mapKeys from 'lodash.mapkeys';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';

const toCamelCase = <T extends object>(input: T) =>
  mapKeys(input, (value, key) => camelCase(key)) as T;
const toSnakeCase = <T extends object>(input: T) =>
  mapKeys(input, (value, key) => snakeCase(key)) as T;

export { toCamelCase, toSnakeCase };
