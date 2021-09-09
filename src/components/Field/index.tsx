import { makeStyles, Box, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

import { FormFieldBox } from "src/components";
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
  onTextFieldChange?: (fieldId: string, value: string) => void;
  onSingleChoiceFieldChange?: (
    fieldId: string,
    value: {
      name: string;
      value: string;
    },
  ) => void;
  onMultipleChoiceFieldChange?: (
    fieldId: string,
    value: {
      id: string;
      value: string;
    },
    otherOptionValueChange?: boolean,
  ) => void;
};

const Field = observer(
  ({
    field,
    onTextFieldChange,
    onSingleChoiceFieldChange,
    onMultipleChoiceFieldChange,
  }: Props) => {
    const classes = useStyles();

    let content: ReactNode | null = null;

    switch (field.config.value) {
      case "shortAnswer": {
        content = (
          <FormText
            variant="short"
            state={field.config.state}
            handleAction={
              onTextFieldChange
                ? (value: string) => onTextFieldChange(field.id, value)
                : undefined
            }
          />
        );
        break;
      }
      case "longAnswer": {
        content = (
          <FormText
            variant="long"
            state={field.config.state}
            handleAction={
              onTextFieldChange
                ? (value: string) => onTextFieldChange(field.id, value)
                : undefined
            }
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
            handleAction={
              onSingleChoiceFieldChange
                ? (value: { name: string; value: string }) =>
                    onSingleChoiceFieldChange(field.id, value)
                : undefined
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
            handleAction={
              onMultipleChoiceFieldChange
                ? (
                    valueItem: { id: string; value: string },
                    otherOptionValueChange = false,
                  ) =>
                    onMultipleChoiceFieldChange(
                      field.id,
                      valueItem,
                      otherOptionValueChange,
                    )
                : undefined
            }
          />
        );
        break;
      }
      case "linearScale": {
        content = (
          <FormLinearScale
            config={field.config}
            handleAction={
              onTextFieldChange
                ? (newValue: string) => onTextFieldChange(field.id, newValue)
                : undefined
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
        <FormFieldBox error={!!field.config.state.error}>
          <Typography variant="body1" className={classes.question}>
            {field.question}{" "}
            {field.schema.required && (
              <span className={classes.asterisk}>*</span>
            )}
          </Typography>
          <Box>{content}</Box>
        </FormFieldBox>
      </Box>
    );
  },
);

export default Field;
