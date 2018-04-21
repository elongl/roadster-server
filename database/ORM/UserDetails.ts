export default interface UserDetails {
  displayName: string;
  phoneNumber: string | undefined;
  isDriver: boolean | undefined;
  oauthId: string;
  oauthProvider: string;
  avatar: string;
}
