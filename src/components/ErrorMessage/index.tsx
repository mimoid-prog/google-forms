import { makeStyles, Box, Typography } from "@material-ui/core";

import { ApiError } from "src/types/ApiError";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    margin: theme.spacing(2, 0),
  },
}));

export type Props = {
  error: ApiError;
};

const ErrorMessage = ({ error }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="body1" color="error">
        {error.message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
