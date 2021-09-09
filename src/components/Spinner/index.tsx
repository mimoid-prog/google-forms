import { makeStyles, Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
  },
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
