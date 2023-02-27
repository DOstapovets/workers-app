export interface User {
  readonly _id: string;
  username: string;
  passHash?: string;
}
