import { makeStyles, Box } from "@material-ui/core";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import useFormCreatorStore from "src/hooks/useFormCreatorStore";

import Fields from "./Fields";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    [theme.breakpoints.up("lg")]: {
      display: "grid",
      gridTemplateColumns: "1fr 50px",
      gap: theme.spacing(2),
    },
  },
}));

const Form = observer(() => {
  const classes = useStyles();

  const { values } = useFormCreatorStore();

  // useEffect(() => {
  //   reaction(
  //     () => ({
  //       title: values.title,
  //       description: values.description,
  //       fields: values.fields.slice(),
  //     }),
  //     (eee) => {
  //       console.log("REACTION!!!!", eee);
  //     },
  //   );
  // }, []);

  return (
    <Box className={classes.root}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Box className={classes.main}>
          <Fields />

          <Sidebar />
        </Box>
      </form>
    </Box>
  );
});

export default Form;
