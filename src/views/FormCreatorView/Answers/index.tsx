import { makeStyles, Box, Typography } from "@material-ui/core";

import { Form } from "src/types/Form";

const useStyles = makeStyles((theme) => ({
  root: {},
  noFormText: {
    textAlign: "center",
  },
}));

export type Props = {
  form: Form | null;
};

const Answers = ({ form }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {!form ? (
        <Typography variant="body1" className={classes.noFormText}>
          Dodaj pola do formularza. <br /> Gdy ktoś wypełni twój formularz,
          odpowiedzi na na niego pojawią się tutaj.
        </Typography>
      ) : (
        <Box>what</Box>
      )}
    </Box>
  );
};

export default Answers;
