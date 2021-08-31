import { useContext } from "react";
import { FormContext } from "src/contexts/FormContext";

const useFormStore = () => {
  const store = useContext(FormContext);

  if (store === undefined)
    throw new Error(
      "useFormStore hooks needs to used within FormStoreProvider"
    );

  return store;
};

export default useFormStore;
