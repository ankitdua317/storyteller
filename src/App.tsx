import { ViewportProvider } from "./context/ViewportProvider";
import DashboardLayout from "./components/Layout";
import Stories from "./components/Stories";
import "./App.css";

const App = () => {
  return (
    <ViewportProvider>
      <DashboardLayout>
        <Stories />
      </DashboardLayout>
    </ViewportProvider>
  );
};

export default App;
