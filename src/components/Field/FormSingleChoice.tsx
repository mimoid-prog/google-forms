import {
  makeStyles,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import { useState } from "react";

import { FormErrorMessage } from "src/components";
import { Option } from "src/types/FormField";

const useStyles = makeStyles((theme) => ({
  root: {},
  otherOptionBox: {
    display: "flex",
    alignItems: "center",
  },
}));

export type Props = {
  options: Option[];
  allowOtherOption: boolean;
  state: {
    value: {
      name: string;
      value: string;
    } | null;
    error: string | null;
  };
  handleAction?: (value: { name: string; value: string }) => void;
};

const FormSingleChoice = ({
  options,
  allowOtherOption,
  state,
  handleAction,
}: Props) => {
  const classes = useStyles();
  const [otherValue, setOtherValue] = useState(
    state.value && state.value.name === "other" ? state.value.value : "",
  );

  const handleOtherChange = (value: string) => {
    if (handleAction) {
      setOtherValue(value);
      handleAction({
        name: "other",
        value,
      });
    }
  };

  const onCheckChange = ({ name, value }: { name: string; value: string }) => {
    if (handleAction) {
      handleAction({
        name,
        value,
      });
    }
  };

  const onOtherValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (handleAction) {
      handleOtherChange(e.target.value);
    }
  };

  return (
    <Box className={classes.root}>
      <FormControl component="fieldset">
        <RadioGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option.id}
              label={option.label}
              control={
                <Radio
                  checked={state.value?.name === option.label}
                  onChange={() =>
                    onCheckChange({
                      name: option.label,
                      value: option.label,
                    })
                  }
                  disabled={!handleAction}
                />
              }
            />
          ))}
          {allowOtherOption && (
            <Box className={classes.otherOptionBox}>
              <FormControlLabel
                label="Inne:"
                control={
                  <Radio
                    checked={state.value?.name === "other"}
                    onChange={() =>
                      onCheckChange({
                        name: "other",
                        value: otherValue,
                      })
                    }
                    disabled={!handleAction}
                  />
                }
              />
              <TextField
                value={otherValue}
                onChange={onOtherValueChange}
                error={state.value?.name === "other" && !!state.error}
                disabled={!handleAction}
              />
            </Box>
          )}
        </RadioGroup>
      </FormControl>
      {!!state.error && <FormErrorMessage />}
    </Box>
  );
};

export default FormSingleChoice;
