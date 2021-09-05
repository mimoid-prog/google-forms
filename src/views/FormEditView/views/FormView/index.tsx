import { makeStyles, Box } from "@material-ui/core";
import Form from "./Form";
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

const FormView = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Form />
      <Sidebar />
    </Box>
  );
};

export default FormView;
