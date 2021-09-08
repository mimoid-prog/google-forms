export type FormField = {
  id: string;
  question: string;
  order: number;
  schema: Schema;
  config: FormFieldConfig;
};

export type Schema = {
  required: boolean;
  allowOtherOption: boolean;
};

export type FormFieldConfig =
  | ShortAnswerConfig
  | LongAnswerConfig
  | SingleChoiceConfig
  | MultipleChoiceConfig
  | LinearScaleConfig;

export type ShortAnswerConfig = {
  value: ShortAnswerValue;
};

export type LongAnswerConfig = {
  value: LongAnswerValue;
};

export type SingleChoiceConfig = {
  value: SingleChoiceValue;
  options: Option[];
};

export type MultipleChoiceConfig = {
  value: MultipleChoiceValue;
  options: Option[];
};

export type LinearScaleConfig = {
  value: LinearScaleValue;
  minScale: string;
  minText: string;
  maxScale: string;
  maxText: string;
};

export type FormFieldConfigValue =
  | ShortAnswerValue
  | LongAnswerValue
  | SingleChoiceValue
  | MultipleChoiceValue
  | LinearScaleValue;

//Value
export type ShortAnswerValue = "shortAnswer";
export type LongAnswerValue = "longAnswer";
export type SingleChoiceValue = "singleChoice";
export type MultipleChoiceValue = "multipleChoice";
export type LinearScaleValue = "linearScale";

//Option
export type Option = {
  id: string;
  label: string;
};

//With state
export type FormFieldWithState = {
  id: string;
  question: string;
  order: number;
  schema: Schema;
  config: FormFieldConfigWithState;
};

export type FormFieldConfigWithState =
  | ShortAnswerConfigWithState
  | LongAnswerConfigWithState
  | SingleChoiceConfigWithState
  | MultipleChoiceConfigWithState
  | LinearScaleConfigWithState;

export type ShortAnswerConfigWithState = ShortAnswerConfig & {
  state: {
    value: string;
    error: string | null;
  };
};

export type LongAnswerConfigWithState = LongAnswerConfig & {
  state: {
    value: string;
    error: string | null;
  };
};

export type SingleChoiceConfigWithState = SingleChoiceConfig & {
  state: {
    value: {
      name: string;
      value: string;
    } | null;
    error: string | null;
  };
};

export type MultipleChoiceConfigWithState = MultipleChoiceConfig & {
  state: {
    value: {
      id: string;
      value: string;
      checked: boolean;
    }[];
    error: string | null;
  };
};

export type LinearScaleConfigWithState = LinearScaleConfig & {
  state: {
    value: string;
    error: string | null;
  };
};

export type ConfigWithStateValue =
  | ShortAnswerConfigWithStateValue
  | LongAnswerConfigWithStateValue
  | SinlgeChoiceConfigWithStateValue
  | MultipleChoiceConfigWithStateValue
  | LinearScaleConfigWithStateValue;

export type ShortAnswerConfigWithStateValue = string;
export type LongAnswerConfigWithStateValue = string;
export type SinlgeChoiceConfigWithStateValue = string;
export type MultipleChoiceConfigWithStateValue = string[];
export type LinearScaleConfigWithStateValue = string;
