import { makeStyles, Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";

import { FormButton } from "src/components";
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
  const history = useHistory();

  const { isSubmitting, submitForm } = useFormCreatorStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdId = await submitForm();
    history.push(`/form-creator/${createdId}`);
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Box className={classes.main}>
          <Box>
            <Fields />
            <FormButton loading={isSubmitting} />
          </Box>

          <Sidebar />
        </Box>
      </form>
    </Box>
  );
});

export default Form;
