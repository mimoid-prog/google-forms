import messages from "./messages";

type Value = {
  name: string;
  value: string;
};

type Config = {
  required: boolean;
  allowOtherOption: boolean;
};

const validateSingleChoiceValue = (value: Value, config: Config) => {
  if (config.required) {
    if (value === null || (value.name === "other" && value.value === "")) {
      return messages.required;
    }
  }

  return null;
};

export default validateSingleChoiceValue;
