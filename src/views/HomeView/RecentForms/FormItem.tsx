import {
  makeStyles,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { PreviewForm } from "src/types/PreviewForm";
import shorten from "src/utils/shorten";

const toReadableTime = (iso: string) => {
  return new Date(iso).toLocaleTimeString().slice(0, 5);
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    border: `1px solid #d9d9d9`,
    overflow: "hidden",
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  preview: {
    backgroundColor: theme.palette.primary.light,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  previewIcon: {
    fontSize: 50,
    color: theme.palette.primary.main,
  },
  info: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  bottomBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  timeBox: {
    display: "flex",
    alignItems: "center",
  },
  time: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

export type Props = {
  form: PreviewForm;
  handleDelete: (id: string) => void;
};

const FormItem = ({ form, handleDelete }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const menuBoxRef = useRef<any>(null);
  const menuRef = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const openForm = (e: React.MouseEvent<HTMLElement>) => {
    if (
      menuBoxRef.current &&
      !menuBoxRef.current.contains(e.target) &&
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      history.push(`/form/${form.id}/creator`);
    }
  };

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root} onClick={openForm}>
      <Box className={classes.preview}>
        <DescriptionOutlinedIcon className={classes.previewIcon} />
      </Box>
      <Box className={classes.info}>
        <Typography
          variant="body2"
          className={classes.title}
          title={form.title}
        >
          {shorten(form.title, 15)}
        </Typography>
        <Box className={classes.bottomBar}>
          <Box className={classes.timeBox}>
            <SpeakerNotesIcon color="primary" />
            <Typography variant="body2" className={classes.time}>
              {`Edytowano ${toReadableTime(form.updatedAt)}`}
            </Typography>
          </Box>
          <div ref={menuBoxRef}>
            <IconButton size="small" onClick={openMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              ref={menuRef}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem onClick={() => handleDelete(form.id)}>
                <ListItemIcon>
                  <DeleteOutlinedIcon />
                </ListItemIcon>
                <Typography variant="inherit">Usuń</Typography>
              </MenuItem>
            </Menu>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default FormItem;
