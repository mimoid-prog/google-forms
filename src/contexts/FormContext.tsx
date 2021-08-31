import { createContext, ReactNode } from "react";
import formStore, { FormStore } from "src/stores/formStore";

const FormContext = createContext<FormStore | undefined>(undefined);

export type Props = {
  children: ReactNode;
};

const FormProvider = ({ children }: Props) => {
  return (
    <FormContext.Provider value={formStore}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
