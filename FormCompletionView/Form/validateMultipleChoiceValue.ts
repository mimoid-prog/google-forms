import messages from "./messages";

type Value = {
  name: string;
  value: string;
}[];

type Config = {
  required: boolean;
  allowOtherOption: boolean;
};

const validateMultipleChoiceValue = (value: Value, config: Config) => {
  if (config.required) {
    if (value.length || (value.length === 1 && value[0].value === "")) {
      return messages.required;
    }
  }

  return null;
};

export default validateMultipleChoiceValue;
