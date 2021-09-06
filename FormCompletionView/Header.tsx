import { makeStyles, Box, Typography, Divider } from "@material-ui/core";
import { FormFieldBox } from "src/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  required: {
    color: theme.palette.error.main,
  },
}));

export type Props = {
  title: string;
  description: string;
};

const Header = ({ title, description }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <FormFieldBox header>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Divider className={classes.divider} />
        <Typography variant="body2" className={classes.required}>
          *Wymagane
        </Typography>
      </FormFieldBox>
    </Box>
  );
};

export default Header;
