import { Answer } from "./Answer";
import { FormField } from "./FormField";

export type Form = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  updatedAt: string;
  answers: Answer[];
};
