import { ViewportProvider } from "./context/ViewportProvider";
import Layout from "./components/Layout";
import Stories from "./components/Stories";
import "./App.css";

const App = () => {
  return (
    <ViewportProvider>
      <Layout>
        <Stories />
      </Layout>
    </ViewportProvider>
  );
};

export default App;
