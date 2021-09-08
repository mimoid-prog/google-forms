import { makeStyles, Box, Typography, Divider, Link } from "@material-ui/core";

import { FormFieldBox } from "src/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(1, 0, 4),
  },
  required: {
    color: theme.palette.error.main,
  },
}));

export type Props = {
  showForm: () => void;
};

const Response = ({ showForm }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <FormFieldBox header>
        <Typography variant="h2" className={classes.title}>
          Gotowe
        </Typography>
        <Typography variant="body1">
          Twoja odpowiedź została zapisana.
        </Typography>
        <Divider className={classes.divider} />
        <Link onClick={showForm} color="secondary">
          Prześlij kolejną odpowiedź
        </Link>
      </FormFieldBox>
    </Box>
  );
};

export default Response;
