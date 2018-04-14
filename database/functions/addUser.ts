import executeQuery from '../helpers/executeQuery';

export default function addUser(user: UserDetails) {
  const { displayName, phoneNumber, isDriver } = user;
  const query = {
    text:
      'INSERT INTO users(display_name, phone_number, is_driver) values ($1, $2, $3);',
    values: [displayName, phoneNumber, isDriver]
  };
  executeQuery(query);
}

export interface UserDetails {
  displayName: string;
  phoneNumber: string;
  isDriver: boolean;
}
