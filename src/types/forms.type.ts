import {
  createschema,
  loginschema,
  registerschema,
} from "@/lib/actions/validation";
import { InferType } from "yup";

export type RegisterData = InferType<typeof registerschema>;

export type LoginData = InferType<typeof loginschema>;

export type CreateData = InferType<typeof createschema>;

export type User = {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  access_token: string;
  user: User;
};

export type JwtPayload = {
  username: string;
  sub: string; // user ID
  iat: number; // issued at timestamp
  exp: number; // expiration timestamp
};

export type ApiErrorResponse = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
};

export type ErrorWithResponse = {
  response?: {
    data?: ApiErrorResponse;
  };
};
