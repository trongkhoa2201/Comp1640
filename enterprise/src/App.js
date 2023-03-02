import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "./App.css";
import Layout from "./components/Layouts/Layout";
import CRUD from "./Page/CRUD";

function App() {
  return (
    <div className="App">
      <Layout />
      {/* <CRUD/> */}
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;
