
export interface User {
  id: number;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface SignupRequest {
  username: string;
  password: string;
}

export interface ChatMessage {
  userId: number;
  username: string;
  text: string;
  timestamp: number;
}
