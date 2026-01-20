export interface LoginInput {
  email?: string;
  password?: string;
}

export interface RegisterInput {
  // name: string;
  email: string;
  password?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  token: string;
  user: User;
}
