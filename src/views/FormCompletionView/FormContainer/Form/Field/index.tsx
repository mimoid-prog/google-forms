import { makeStyles, Box, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

import { FormFieldBox } from "src/components";
import useFormCompletionStore from "src/hooks/useFormCompletionStore";
import { FormFieldWithState } from "src/types/FormField";

import FormLinearScale from "./FormLinearScale";
import FormMultipleChoice from "./FormMultipleChoice";
import FormSingleChoice from "./FormSingleChoice";
import FormText from "./FormText";

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
  field: FormFieldWithState;
};

const Field = observer(({ field }: Props) => {
  const classes = useStyles();

  const {
    onTextFieldChange,
    onSingleChoiceFieldChange,
    onMultipleChoiceFieldChange,
  } = useFormCompletionStore();

  let content: ReactNode | null = null;

  switch (field.config.value) {
    case "shortAnswer": {
      content = (
        <FormText
          variant="short"
          state={field.config.state}
          onChange={(value: string) => onTextFieldChange(field.id, value)}
        />
      );
      break;
    }
    case "longAnswer": {
      content = (
        <FormText
          variant="long"
          state={field.config.state}
          onChange={(value: string) => onTextFieldChange(field.id, value)}
        />
      );
      break;
    }
    case "singleChoice": {
      content = (
        <FormSingleChoice
          options={field.config.options}
          allowOtherOption={field.schema.allowOtherOption}
          state={field.config.state}
          handleAction={(value: { name: string; value: string }) =>
            onSingleChoiceFieldChange(field.id, value)
          }
        />
      );
      break;
    }
    case "multipleChoice": {
      content = (
        <FormMultipleChoice
          allowOtherOption={field.schema.allowOtherOption}
          state={field.config.state}
          handleAction={(
            valueItem: { id: string; value: string },
            otherOptionValueChange = false,
          ) =>
            onMultipleChoiceFieldChange(
              field.id,
              valueItem,
              otherOptionValueChange,
            )
          }
        />
      );
      break;
    }
    case "linearScale": {
      content = (
        <FormLinearScale
          config={field.config}
          onChange={(newValue: string) => onTextFieldChange(field.id, newValue)}
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
      <FormFieldBox error={!!field.config.state.error}>
        <Typography variant="body1" className={classes.question}>
          {field.question}{" "}
          {field.schema.required && <span className={classes.asterisk}>*</span>}
        </Typography>
        <Box>{content}</Box>
      </FormFieldBox>
    </Box>
  );
});

export default Field;
