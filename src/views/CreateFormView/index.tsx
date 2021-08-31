import { makeStyles, Box } from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "src/components";
import QuestionsAnswersTabs from "./QuestionsAnswersTabs";
import { TabValue } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

type Params = {
  id: string;
};

const CreateFormView = () => {
  const classes = useStyles();
  const { id } = useParams<Params>();
  const [tab, setTab] = useState<TabValue>("questions");

  const changeTab = (newTab: TabValue) => {
    setTab(newTab);
  };

  return (
    <Layout>
      <QuestionsAnswersTabs value={tab} changeValue={changeTab} />
      <p>CreateFormView, {id}</p>
    </Layout>
  );
};

export default CreateFormView;
