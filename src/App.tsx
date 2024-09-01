import { ScrollRestoration } from "react-router-dom";
import MainLayout from "./layout/MainLayout";


const App = () => {
  return (
    <div>
      <MainLayout/>
      <ScrollRestoration />
    </div>
  );
};

export default App