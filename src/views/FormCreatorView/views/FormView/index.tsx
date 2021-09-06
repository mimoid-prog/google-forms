import { makeStyles, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { nanoid } from "nanoid";
import { useState } from "react";
import formCreatorStore from "src/stores/formCreatorStore";
import { FormField } from "src/types/FormField";
import { FormValues } from "src/types/FormValues";
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
