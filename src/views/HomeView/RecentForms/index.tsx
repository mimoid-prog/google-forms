import { makeStyles, Box, Typography } from "@material-ui/core";
import Container from "src/components/Container";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const RecentForms = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h5">Ostatnie formularze</Typography>
        <Typography variant="body1">
          Nie posiadasz żadnych formularzy. Utwórz nowy, a pojawi się on w tym
          miejscu.
        </Typography>
      </Container>
    </Box>
  );
};

export default RecentForms;
