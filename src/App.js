import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Cancel from "./Page/Cancel";
import Fail from "./Page/Fail";
import Home from "./Page/Home";
import Success from "./Page/Success";

axios.defaults.baseURL = 'http://localhost:8000/api';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/success" exact element={<Success />} />
        <Route path="/fail" exact element={<Fail />} />
        <Route path="/cancel" exact element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;
