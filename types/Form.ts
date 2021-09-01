import { Field } from "./Field";

export type Form = {
  id: string;
  title: string;
  description: string;
  fields: Field[];
};
