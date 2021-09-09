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
  handleAction?: (value: string) => void;
};

const FormText = ({ variant, state, handleAction }: Props) => {
  const classes = useStyles();

  const onAction = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (handleAction) {
      handleAction(e.target.value);
    }
  };

  return (
    <Box className={classes.root}>
      <TextField
        placeholder="Twoja odpowiedź"
        className={clsx(variant === "short" ? classes.short : classes.long)}
        value={state.value}
        onChange={onAction}
        onBlur={onAction}
        error={!!state.error}
        disabled={!handleAction}
      />
      {!!state.error && <FormErrorMessage />}
    </Box>
  );
};

export default FormText;
