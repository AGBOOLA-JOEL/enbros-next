import {
  createschema,
  loginschema,
  registerschema,
} from "@/lib/actions/validation";
import { InferType } from "yup";

export type RegisterData = InferType<typeof registerschema>;

export type LoginData = InferType<typeof loginschema>;

export type CreateData = InferType<typeof createschema>;
