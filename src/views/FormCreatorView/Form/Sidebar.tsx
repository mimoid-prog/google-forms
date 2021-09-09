import { makeStyles, Paper, IconButton, Tooltip, Box } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import ImportExportOutlinedIcon from "@material-ui/icons/ImportExportOutlined";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

import useFormCreatorStore from "src/hooks/useFormCreatorStore";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  menuBox: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "95vw",
    height: "auto",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up("lg")]: {
      position: "sticky",
      top: 135,
      bottom: "auto",
      width: "auto",
      transform: "translateX(0)",
    },
  },
  menu: {
    listStyle: "none",
    margin: 0,
    padding: theme.spacing(2, 1),
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(1),
    },
  },
}));

type MenuItem = {
  icon: ReactNode;
  title: string;
  callback?: () => void;
};

const Sidebar = observer(() => {
  const classes = useStyles();

  const { addField } = useFormCreatorStore();

  const items: MenuItem[] = [
    {
      icon: <AddCircleOutlineIcon />,
      title: "Dodaj pytanie",
      callback: addField,
    },
    {
      icon: <ImportExportOutlinedIcon />,
      title: "Importuj pytania",
    },
    {
      icon: <FormatSizeIcon />,
      title: "Dodaj tytuł i opis",
    },
    {
      icon: <CropOriginalIcon />,
      title: "Dodaj obraz",
    },
    {
      icon: <MovieCreationOutlinedIcon />,
      title: "Dodaj film",
    },
    {
      icon: <ViewAgendaOutlinedIcon />,
      title: "Dodaj sekcję",
    },
  ];

  return (
    <Box className={classes.root}>
      <Paper className={classes.menuBox}>
        <ul className={classes.menu}>
          {items.map((item) => (
            <li key={item.title}>
              <Tooltip title={item.title} placement="right">
                <span>
                  <IconButton
                    size="small"
                    onClick={item.callback}
                    disabled={item.callback === undefined}
                  >
                    {item.icon}
                  </IconButton>
                </span>
              </Tooltip>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
});

export default Sidebar;
