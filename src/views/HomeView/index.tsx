import CreateForms from "./CreateForms";
import Navbar from "./Navbar";
import RecentForms from "./RecentForms";

const HomeView = () => {
  return (
    <div>
      <Navbar />
      <CreateForms />
      <RecentForms />
    </div>
  );
};

export default HomeView;
