import { makeStyles, Box, TextField } from "@material-ui/core";
import clsx from "clsx";
import { FormErrorMessage } from "src/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  short: {
    width: "50%",
  },
  long: {
    width: "100%",
  },
}));

export type Props = {
  variant: "short" | "long";
  state: {
    value: string;
    error: string | null;
  };
  onChange: (value: string) => void;
  // onBlur: (value: string) => void;
};

const FormText = ({ variant, state, onChange }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TextField
        placeholder="Twoja odpowiedź"
        className={clsx(variant === "short" ? classes.short : classes.long)}
        value={state.value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onChange(e.target.value)}
        error={!!state.error}
      />
      {!!state.error && <FormErrorMessage />}
    </Box>
  );
};

export default FormText;
