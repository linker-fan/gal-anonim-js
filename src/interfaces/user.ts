export interface JwtPayload {
  id: number;
  username: string;
  isAdmin: boolean;
}

export interface LoginResult {
  token: string;
}
