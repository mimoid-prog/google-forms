import { nanoid } from "nanoid";

import { Answer } from "src/types/Answer";
import { Form } from "src/types/Form";
import { FormEditorValues } from "src/types/FormEditorValues";
import { FormFieldWithState } from "src/types/FormField";
import { GetFormsConfig } from "src/types/GetFormsConfig";
import { PreviewForm } from "src/types/PreviewForm";

const FAKE_DELAY = 300;

export const getForm = (id: string): Promise<Form | null> => {
  return new Promise((resolve, reject) => {
    try {
      const forms = localStorage.getItem("forms");

      if (forms) {
        const parsedForms: Form[] = JSON.parse(forms);
        const form = parsedForms.find((form) => form.id === id);

        return setTimeout(() => resolve(form || null), FAKE_DELAY);
      } else {
        return setTimeout(() => resolve(null), FAKE_DELAY);
      }
    } catch (error) {
      return reject({
        message: "An error occured",
      });
    }
  });
};

//Unsolved issue with conditional promise return type: https://github.com/microsoft/TypeScript/issues/27987
export const getForms = <T extends GetFormsConfig>(
  { preview = false }: GetFormsConfig = { preview: false },
): Promise<T extends { preview: true } ? PreviewForm[] : Form[]> => {
  return new Promise((resolve, reject) => {
    try {
      const forms = localStorage.getItem("forms");

      if (forms) {
        const parsedForms: Form[] = JSON.parse(forms);

        const sortedForms = parsedForms.sort(
          (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
        );

        const preperedForms: PreviewForm[] | Form[] = preview
          ? (sortedForms.map((form) => ({
              id: form.id,
              title: form.title,
              updatedAt: form.updatedAt,
            })) as PreviewForm[])
          : (sortedForms as Form[]);

        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          return resolve(preperedForms);
        }, FAKE_DELAY);
      } else {
        return resolve([]);
      }
    } catch (error) {
      return reject({
        message: "An error occured",
      });
    }
  }) as Promise<T extends { preview: true } ? PreviewForm[] : Form[]>;
};
export const saveForm = (
  id: string,
  values: FormEditorValues,
): Promise<Form> => {
  return new Promise((resolve, reject) => {
    try {
      getForms().then((forms) => {
        const savedForm = forms.find((form) => form.id === id);

        const newForm = savedForm
          ? {
              ...savedForm,
              ...values,
              updatedAt: new Date().toISOString(),
            }
          : {
              ...values,
              id,
              updatedAt: new Date().toISOString(),
              answers: [],
            };

        const newForms = savedForm
          ? forms.map((form) => (form.id === id ? newForm : form))
          : [...forms, newForm];

        localStorage.setItem("forms", JSON.stringify(newForms));

        setTimeout(() => resolve(newForm), FAKE_DELAY);
      });
    } catch (error) {
      return reject({
        message: "An error occured",
      });
    }
  });
};

export const deleteForm = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      getForms().then((forms) => {
        const newForms = forms.filter((form) => form.id !== id);
        localStorage.setItem("forms", JSON.stringify(newForms));
        return resolve();
      });
    } catch (error) {
      return reject({
        message: "An error occured",
      });
    }
  });
};

export const addAnswer = (
  formId: string,
  fieldsValues: FormFieldWithState[],
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      getForms().then((forms: Form[]) => {
        const newAnswer: Answer = {
          id: nanoid(),
          createdAt: new Date().toISOString(),
          fields: fieldsValues,
        };

        const newForms = forms.map((form) =>
          form.id === formId
            ? {
                ...form,
                answers: [...form.answers, newAnswer],
              }
            : form,
        );

        localStorage.setItem("forms", JSON.stringify(newForms));

        setTimeout(() => resolve(), FAKE_DELAY);
      });
    } catch (error) {
      return reject({
        message: "An error occured",
      });
    }
  });
};
