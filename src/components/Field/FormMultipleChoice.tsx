import {
  makeStyles,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  TextField,
  Checkbox,
} from "@material-ui/core";

import { FormErrorMessage } from "src/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  otherOptionBox: {
    display: "flex",
    alignItems: "center",
  },
}));

export type Props = {
  allowOtherOption: boolean;
  state: {
    value: {
      id: string;
      value: string;
      checked: boolean;
    }[];
    error: string | null;
  };
  handleAction?: (
    value: { id: string; value: string },
    otherOptionValueChange?: boolean,
  ) => void;
};

const FormMultipleChoice = ({
  allowOtherOption,
  state,
  handleAction,
}: Props) => {
  const classes = useStyles();

  const onCheckChange = (value: { id: string; value: string }) => {
    if (handleAction) {
      handleAction(value);
    }
  };

  const onOtherValueChange = (value: { id: string; value: string }) => {
    if (handleAction) {
      handleAction(value, true);
    }
  };

  return (
    <Box className={classes.root}>
      <FormControl component="fieldset">
        <FormGroup>
          {state.value.map((option) => {
            if (option.id === "other" && allowOtherOption) {
              return (
                <Box className={classes.otherOptionBox} key={option.id}>
                  <FormControlLabel
                    value="other"
                    control={
                      <Checkbox
                        checked={option.checked}
                        onChange={() =>
                          onCheckChange({
                            id: "other",
                            value: option.value,
                          })
                        }
                        disabled={!handleAction}
                      />
                    }
                    label="Inne:"
                  />
                  <TextField
                    value={option.value}
                    onChange={(e) =>
                      onOtherValueChange({
                        id: "other",
                        value: e.target.value,
                      })
                    }
                    disabled={!handleAction}
                  />
                </Box>
              );
            } else {
              return (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      name={option.id}
                      checked={option.checked}
                      onChange={() =>
                        onCheckChange({
                          id: option.id,
                          value: option.value,
                        })
                      }
                      disabled={!handleAction}
                    />
                  }
                  label={option.value}
                />
              );
            }
          })}
        </FormGroup>
      </FormControl>
      {!!state.error && <FormErrorMessage />}
    </Box>
  );
};

export default FormMultipleChoice;
