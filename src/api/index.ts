import { nanoid } from "nanoid";

import { Form } from "src/types/Form";
import { FormEditorValues } from "src/types/FormEditorValues";

export const getForm = (id: string): Promise<Form> => {
  return new Promise((resolve, reject) => {
    try {
      const forms = localStorage.getItem("forms");

      if (forms) {
        const parsedForms: Form[] = JSON.parse(forms);
        const form = parsedForms.find((form) => form.id === id);

        if (form) {
          return resolve(form);
        } else {
          return reject({ message: "Form not found" });
        }
      } else {
        return reject({ message: "Forms not found" });
      }
    } catch (error) {
      return reject({
        message: "An error occured",
      });
    }
  });
};

export const getForms = (): Promise<Form[]> => {
  return new Promise((resolve, reject) => {
    try {
      const forms = localStorage.getItem("forms");

      if (forms) {
        const parsedForms: Form[] = JSON.parse(forms);

        const sortedForms = parsedForms.sort(
          (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
        );

        return resolve(sortedForms);
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

export const createForm = (data: FormEditorValues): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      getForms().then((forms) => {
        const id = nanoid();

        const newForm: Form = {
          ...data,
          id,
          updatedAt: new Date().toISOString(),
        };

        const newForms = [...forms, newForm];

        localStorage.setItem("forms", JSON.stringify(newForms));
        return resolve(id);
      });
    } catch (error) {
      return reject({
        message: "An error occured",
      });
    }
  });
};

export const updateForm = (
  id: string,
  data: FormEditorValues,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      getForms().then((forms) => {
        const newForms = forms.map((form) => {
          if (form.id === id) {
            return {
              ...data,
              updatedAt: new Date().toISOString(),
            };
          } else {
            return form;
          }
        });

        localStorage.setItem("forms", JSON.stringify(newForms));

        return resolve(id);
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
