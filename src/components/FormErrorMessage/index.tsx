import { makeStyles, Box, Typography } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export type Props = {
  text?: string;
};

const FormErrorMessage = ({
  text = "Odpowiedź na to pytanie jest wymagana",
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ErrorOutlineIcon color="error" className={classes.icon} />
      <Typography variant="body2" color="error">
        {text}
      </Typography>
    </Box>
  );
};

export default FormErrorMessage;
