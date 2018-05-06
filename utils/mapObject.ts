import mapKeys from 'lodash.mapkeys';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';

const toCamelCase = <T>(input: T) => mapKeys(input, (value, key) => camelCase(key)) as T;

const toSnakeCase = <T>(input: T) => mapKeys(input, (value, key) => snakeCase(key)) as T;

export { toCamelCase, toSnakeCase };
