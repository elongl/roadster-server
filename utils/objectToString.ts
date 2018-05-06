import snakeCase from 'lodash.snakecase';

const objectToString = <T>(input: T) =>
  Object.entries(input)
    .map(([key, val]) => `${snakeCase(key)} = '${val}'`)
    .join(', ');

export default objectToString;
