export type FormField = {
  id: string;
  question: string;
  required: boolean;
  order: number;
  type: FormFieldType;
};

export type FormFieldType =
  | ShortAnswerType
  | LongAnswerType
  | SingleChoiceType
  | MultipleChoiceType
  | LinearScaleType;

export type ShortAnswerType = {
  value: ShortAnswerValue;
};

export type LongAnswerType = {
  value: LongAnswerValue;
};

export type SingleChoiceType = {
  value: SingleChoiceValue;
  options: Option[];
  allowOtherOption: boolean;
};

export type MultipleChoiceType = {
  value: MultipleChoiceValue;
  options: Option[];
  allowOtherOption: boolean;
};

export type LinearScaleType = {
  value: LinearScaleValue;
  minScale: string;
  minText: string;
  maxScale: string;
  maxText: string;
};

export type FormFieldTypeValue =
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
  required: boolean;
  order: number;
  type: FormFieldTypeWithState;
};

export type FormFieldTypeWithState =
  | ShortAnswerTypeWithState
  | LongAnswerTypeWithState
  | SingleChoiceTypeWithState
  | MultipleChoiceTypeWithState
  | LinearScaleTypeWithState;

export type ShortAnswerTypeWithState = ShortAnswerType & {
  state: {
    value: string;
    error: string | null;
  };
};

export type LongAnswerTypeWithState = LongAnswerType & {
  state: {
    value: string;
    error: string | null;
  };
};

export type SingleChoiceTypeWithState = SingleChoiceType & {
  state: {
    value: {
      name: string;
      value: string;
    } | null;
    error: string | null;
  };
};

export type MultipleChoiceTypeWithState = MultipleChoiceType & {
  state: {
    value: {
      name: string;
      value: string;
    }[];
    error: string | null;
  };
};

export type LinearScaleTypeWithState = LinearScaleType & {
  state: {
    value: string;
    error: string | null;
  };
};
