import { useContext } from "react";

import { FormCreatorContext } from "src/contexts/FormCreatorContext";

const useFormCreatorStore = () => {
  const store = useContext(FormCreatorContext);

  if (store === undefined)
    throw new Error(
      "useFormCreatorStore hook needs to used within FormCreatorStoreProvider",
    );

  return store;
};

export default useFormCreatorStore;
