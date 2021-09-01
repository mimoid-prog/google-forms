import { makeStyles, Box, Tabs, Tab } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { TabValue } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid #d9d9d9`,
  },
  tab: {
    textTransform: "capitalize",
  },
}));

export type Props = {
  value: string;
  changeValue: (value: TabValue) => void;
};

const Navbar = ({ value, changeValue }: Props) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  return (
    <Box className={classes.root}>
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
          to={`/${id}`}
        />
        <Tab
          label="Odpowiedzi"
          value="answers"
          className={classes.tab}
          component={Link}
          to={`/${id}/answers`}
        />
      </Tabs>
    </Box>
  );
};

export default Navbar;
