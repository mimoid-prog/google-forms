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
  handleAction: (value: { name: string; value: string }) => void;
};

const FormSingleChoice = ({
  options,
  allowOtherOption,
  state,
  handleAction,
}: Props) => {
  const classes = useStyles();
  const [otherValue, setOtherValue] = useState("");

  const handleOtherChange = (value: string) => {
    setOtherValue(value);
    handleAction({
      name: "other",
      value,
    });
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
                    handleAction({
                      name: option.label,
                      value: option.label,
                    })
                  }
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
                      handleAction({
                        name: "other",
                        value: otherValue,
                      })
                    }
                  />
                }
              />
              <TextField
                value={otherValue}
                onChange={(e) => handleOtherChange(e.target.value)}
                error={state.value?.name === "other" && !!state.error}
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
