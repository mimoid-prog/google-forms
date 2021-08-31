import { makeStyles, Box, Typography } from "@material-ui/core";
import Container from "src/components/Container";
import newFormImage from "src/assets/images/new-form-icon.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f1f3f4",
  },
  newFormBox: {
    marginTop: theme.spacing(2),
  },
  newFormLink: {
    display: "block",
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    overflow: "hidden",
    width: 150,
    border: `1px solid #d9d9d9`,
    marginBottom: theme.spacing(1),
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
  newFormImage: {
    width: "100%",
    userSelect: "none",
  },
}));

const CreateForms = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h5">Tworzenie nowego formularza</Typography>
        <Box className={classes.newFormBox}>
          <Link to="/form" className={classes.newFormLink}>
            <img
              src={newFormImage}
              className={classes.newFormImage}
              alt="Grafika z plusem służąca do utworzenia nowego formularza"
              draggable="false"
            />
          </Link>
          <Typography>Pusty</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateForms;
