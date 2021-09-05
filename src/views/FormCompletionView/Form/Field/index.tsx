import { makeStyles, Box, Typography } from "@material-ui/core";
import { ReactNode } from "react";
import { FormFieldBox } from "src/components";
import { FormFieldWithState } from "src/types/FormField";

import FormText from "./FormText";
import FormSingleChoice from "./FormSingleChoice";
import FormMultipleChoice from "./FormMultipleChoice";
import FormLinearScale from "./FormLinearScale";

const useStyles = makeStyles((theme) => ({
  root: {},
  question: {
    marginBottom: theme.spacing(1),
  },
  asterisk: {
    color: theme.palette.error.main,
  },
}));

export type Props = {
  fieldWithState: FormFieldWithState;
  handleStringValueChange: (id: string, value: string) => void;
  handleSingleChoiceAction: (
    id: string,
    value: { name: string; value: string }
  ) => void;
  handleMultipleChoiceAction: (
    id: string,
    valueItem: { name: string; value: string }
  ) => void;
};

const Field = ({
  fieldWithState,
  handleStringValueChange,
  handleMultipleChoiceAction,
  handleSingleChoiceAction,
}: Props) => {
  const classes = useStyles();

  let content: ReactNode | null = null;

  switch (fieldWithState.type.value) {
    case "shortAnswer": {
      content = (
        <FormText
          variant="short"
          state={fieldWithState.type.state}
          onChange={(newValue: string) =>
            handleStringValueChange(fieldWithState.id, newValue)
          }
        />
      );
      break;
    }
    case "longAnswer": {
      content = (
        <FormText
          variant="long"
          state={fieldWithState.type.state}
          onChange={(newValue: string) =>
            handleStringValueChange(fieldWithState.id, newValue)
          }
        />
      );
      break;
    }
    case "singleChoice": {
      content = (
        <FormSingleChoice
          options={fieldWithState.type.options}
          allowOtherOption={fieldWithState.type.allowOtherOption}
          state={fieldWithState.type.state}
          handleAction={(value: { name: string; value: string }) =>
            handleSingleChoiceAction(fieldWithState.id, value)
          }
        />
      );
      break;
    }
    case "multipleChoice": {
      content = (
        <FormMultipleChoice
          options={fieldWithState.type.options}
          allowOtherOption={fieldWithState.type.allowOtherOption}
          state={fieldWithState.type.state}
          handleAction={(valueItem: { name: string; value: string }) =>
            handleMultipleChoiceAction(fieldWithState.id, valueItem)
          }
        />
      );
      break;
    }
    case "linearScale": {
      content = (
        <FormLinearScale
          config={fieldWithState.type}
          onChange={(newValue: string) =>
            handleStringValueChange(fieldWithState.id, newValue)
          }
        />
      );
      break;
    }
    default: {
      return null;
    }
  }

  return (
    <Box className={classes.root}>
      <FormFieldBox error={!!fieldWithState.type.state.error}>
        <Typography variant="body1" className={classes.question}>
          {fieldWithState.question}{" "}
          {fieldWithState.required && (
            <span className={classes.asterisk}>*</span>
          )}
        </Typography>
        <Box>{content}</Box>
      </FormFieldBox>
    </Box>
  );
};

export default Field;
