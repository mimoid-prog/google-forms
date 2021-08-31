import { makeStyles, Box, Tabs, Tab } from "@material-ui/core";
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

const QuestionsAnswersTabs = ({ value, changeValue }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Tabs
        value={value}
        onChange={(e, newValue: TabValue) => changeValue(newValue)}
        indicatorColor="primary"
        centered
      >
        <Tab label="Pytania" value="questions" className={classes.tab} />
        <Tab label="Odpowiedzi" value="answers" className={classes.tab} />
      </Tabs>
    </Box>
  );
};

export default QuestionsAnswersTabs;
