import { makeStyles, Box, Typography, ButtonBase } from "@material-ui/core";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";

import newFormImage from "src/assets/images/new-form-icon.png";
import Container from "src/components/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f1f3f4",
  },
  newFormBox: {
    marginTop: theme.spacing(2),
  },
  newFormImageButton: {
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
  const history = useHistory();

  const openNewForm = () => {
    //TODO: change it to Link instead of function redirect
    const generatedId = nanoid();
    history.push(`/form-creator`);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h5">Tworzenie nowego formularza</Typography>
        <Box className={classes.newFormBox}>
          <ButtonBase
            className={classes.newFormImageButton}
            onClick={openNewForm}
          >
            <img
              src={newFormImage}
              className={classes.newFormImage}
              alt="Grafika z plusem służąca do utworzenia nowego formularza"
              draggable="false"
            />
          </ButtonBase>
          <Typography>Pusty</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateForms;
