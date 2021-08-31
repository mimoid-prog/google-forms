import { Layout } from "src/components";
import CreateForms from "./CreateForms";
import RecentForms from "./RecentForms";

const HomeView = () => {
  return (
    <Layout>
      <CreateForms />
      <RecentForms />
    </Layout>
  );
};

export default HomeView;
