import { makeStyles, Box } from "@material-ui/core";

import Fields from "./Fields";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("lg")]: {
      display: "grid",
      gridTemplateColumns: "1fr 50px",
      gap: theme.spacing(2),
    },
  },
}));

const Form = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Fields />
      <Sidebar />
    </Box>
  );
};

export default Form;
