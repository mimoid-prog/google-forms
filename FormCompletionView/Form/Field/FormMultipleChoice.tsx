import {
  makeStyles,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  TextField,
  Checkbox,
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
    }[];
    error: string | null;
  };
  handleAction: (value: { name: string; value: string }) => void;
};

const FormMultipleChoice = ({
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

  console.log(state.value);

  return (
    <Box className={classes.root}>
      <FormControl component="fieldset">
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option.id}
              control={
                <Checkbox
                  name={option.label}
                  checked={
                    state.value.findIndex(
                      (valueItem) => valueItem.name === option.label
                    ) !== -1
                  }
                  onChange={(e) =>
                    handleAction({
                      name: option.label,
                      value: option.label,
                    })
                  }
                />
              }
              label={option.label}
            />
          ))}
          {allowOtherOption && (
            <Box className={classes.otherOptionBox}>
              <FormControlLabel
                value="other"
                control={
                  <Checkbox
                    checked={
                      state.value.findIndex(
                        (valueItem) => valueItem.name === "other"
                      ) !== -1
                    }
                    onChange={() =>
                      handleAction({
                        name: "other",
                        value: otherValue,
                      })
                    }
                  />
                }
                label="Inne:"
              />
              <TextField
                value={otherValue}
                onChange={(e) => handleOtherChange(e.target.value)}
                error={false}
              />
            </Box>
          )}
        </FormGroup>
      </FormControl>
      {!!state.error && <FormErrorMessage />}
    </Box>
  );
};

export default FormMultipleChoice;
