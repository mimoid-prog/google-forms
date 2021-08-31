import {
  makeStyles,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import formLogo from "src/assets/images/form-logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import TuneIcon from "@material-ui/icons/Tune";

const useStyles = makeStyles((theme) => ({
  root: {},
  homeLinkBox: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    display: "flex",
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
  avatar: {
    width: 30,
    height: 30,
    marginLeft: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Box className={classes.homeLinkBox}>
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
          </Box>

          <IconButton>
            <TuneIcon />
          </IconButton>
          <Avatar className={classes.avatar} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
