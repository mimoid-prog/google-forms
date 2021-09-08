import { Form } from "src/types/Form";
import { FormEditorValues } from "src/types/FormEditorValues";
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

export const getForms = (
  { preview }: GetFormsConfig = { preview: false },
): Promise<Form[] | PreviewForm[]> => {
  return new Promise((resolve, reject) => {
    try {
      const forms = localStorage.getItem("forms");

      if (forms) {
        const parsedForms: Form[] = JSON.parse(forms);

        const sortedForms = parsedForms.sort(
          (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
        );

        const preperedForms = preview
          ? sortedForms.map((form) => ({
              id: form.id,
              title: form.title,
              updatedAt: form.updatedAt,
            }))
          : sortedForms;

        setTimeout(() => {
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
  });
};

export const saveForm = (
  id: string,
  values: FormEditorValues,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      getForms().then((forms) => {
        const isCreated = forms.findIndex((form) => form.id === id) !== -1;

        const newForm = {
          ...values,
          id,
          updatedAt: new Date().toISOString(),
        };

        const newForms = isCreated
          ? forms.map((form) => (form.id === id ? newForm : form))
          : [...forms, newForm];

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
