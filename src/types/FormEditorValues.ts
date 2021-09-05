import { Form } from "./Form";

export type FormEditorValues = Omit<Form, "id" | "updatedAt">;
