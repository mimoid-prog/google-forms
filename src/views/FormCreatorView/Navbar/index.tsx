import {
  makeStyles,
  Box,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import TuneIcon from "@material-ui/icons/Tune";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

import formLogo from "src/assets/images/form-logo.png";
import useFormCreatorStore from "src/hooks/useFormCreatorStore";

import { TabValue } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid #d9d9d9`,
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  tab: {
    textTransform: "capitalize",
  },
  leftPanelBox: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  homeLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    flexGrow: 0,
  },
  logo: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      width: 40,
      height: 40,
      marginRight: theme.spacing(1),
      display: "block",
    },
  },
  title: {
    fontSize: 24,
  },
  savingText: {
    marginLeft: theme.spacing(2),
  },
  formCompletionBtn: {
    marginRight: theme.spacing(1),
    textTransform: "none",
  },
  avatar: {
    width: 30,
    height: 30,
    marginLeft: theme.spacing(1),
  },
}));

export type Props = {
  value: string;
  changeValue: (value: TabValue) => void;
};

const Navbar = observer(({ value, changeValue }: Props) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const { isSaving, isSaved } = useFormCreatorStore();

  return (
    <Box className={classes.root}>
      <Box>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Box className={classes.leftPanelBox}>
              <Link to="/" className={classes.homeLink}>
                <img
                  src={formLogo}
                  alt="Formularze Google logotyp"
                  className={classes.logo}
                />
                <Typography variant="h1" className={classes.title}>
                  Formularze
                </Typography>
              </Link>
              {isSaving ? (
                <Typography variant="body2" className={classes.savingText}>
                  Zapisuję...
                </Typography>
              ) : isSaved ? (
                <Typography variant="body2" className={classes.savingText}>
                  Wszystkie zmiany zostały <br />
                  zapisane w Local Storage
                </Typography>
              ) : null}
            </Box>

            <Button
              variant="contained"
              color="primary"
              className={classes.formCompletionBtn}
              component="a"
              href={`/form/${id}/completion`}
            >
              Wyślij
            </Button>
            <IconButton>
              <TuneIcon />
            </IconButton>
            <Avatar className={classes.avatar} />
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Tabs
          value={value}
          onChange={(e, newValue: TabValue) => changeValue(newValue)}
          indicatorColor="primary"
          centered
        >
          <Tab
            label="Pytania"
            value="questions"
            className={classes.tab}
            component={Link}
            to={`/form/${id}/creator`}
          />
          <Tab
            label="Odpowiedzi"
            value="answers"
            className={classes.tab}
            component={Link}
            to={`/form/${id}/creator/answers`}
            disabled={!isSaved}
          />
        </Tabs>
      </Box>
    </Box>
  );
});

export default Navbar;
