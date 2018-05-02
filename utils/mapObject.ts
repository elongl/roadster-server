import mapKeys from 'lodash.mapkeys';
import camelCase from 'lodash.camelcase';
const mapObject = <T>(dbObject: T) =>
  mapKeys(dbObject, (value, key) => camelCase(key)) as T;
export default mapObject;
