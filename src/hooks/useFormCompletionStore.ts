import { useContext } from "react";

import { FormCompletionContext } from "src/contexts/FormCompletionContext";

const useFormCompletionStore = () => {
  const store = useContext(FormCompletionContext);

  if (store === undefined)
    throw new Error(
      "useFormCompletionStore hook needs to used within FormCompletionStoreProvider",
    );

  return store;
};

export default useFormCompletionStore;
