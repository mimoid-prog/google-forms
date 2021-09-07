import { makeStyles, Box, Typography, IconButton } from "@material-ui/core";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { Link } from "react-router-dom";

import { Form } from "src/types/Form";
import shorten from "src/utils/shorten";

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
  form: Form;
};

const FormItem = ({ form }: Props) => {
  const classes = useStyles();

  return (
    <Link to={`/form/${form.id}/creator`}>
      <Box className={classes.root}>
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
                Otwarto 19:45
              </Typography>
            </Box>
            <Box>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default FormItem;
