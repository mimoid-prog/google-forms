import { createContext, ReactNode } from "react";

import { FormCreatorStore } from "src/stores/formCreatorStore";

export const FormCreatorContext = createContext<FormCreatorStore | undefined>(
  undefined,
);

export type Props = {
  children: ReactNode;
  store: FormCreatorStore;
};

const FormCreatorProvider = ({ children, store }: Props) => {
  return (
    <FormCreatorContext.Provider value={store}>
      {children}
    </FormCreatorContext.Provider>
  );
};

export default FormCreatorProvider;
