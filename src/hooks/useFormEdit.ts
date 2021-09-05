import { useContext } from "react";
import { FormEditContext } from "src/contexts/FormEditContext";

const useFormEdit = () => {
  const store = useContext(FormEditContext);

  if (store === undefined)
    throw new Error("useFormEdit hooks needs to used within FormEditProvider");

  return store;
};

export default useFormEdit;
