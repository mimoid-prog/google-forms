import { FormFieldWithState } from "./FormField";

export type Answer = {
  id: string;
  createdAt: string;
  fields: FormFieldWithState[];
};
