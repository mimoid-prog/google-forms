import { createContext, ReactNode } from "react";

import { FormCompletionStore } from "src/stores/FormCompletionStore";

export const FormCompletionContext = createContext<
  FormCompletionStore | undefined
>(undefined);

export type Props = {
  children: ReactNode;
  store: FormCompletionStore;
};

const FormCompletionProvider = ({ children, store }: Props) => {
  return (
    <FormCompletionContext.Provider value={store}>
      {children}
    </FormCompletionContext.Provider>
  );
};

export default FormCompletionProvider;
