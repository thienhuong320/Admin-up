import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter từ react-router-dom
import SideBar from "./components/SideBar";
import HomePage from "./pages/HomePage"; // Import HomePage
import QuanlyGame from "./pages/QuanLiGame"; // Import QuanlyGame
import QuanlyUser from "./pages/QuanLiUser"; // Import QuanlyUser
import "../src/assets/css/sb-admin-2.min.css";

function App() {
  return (
    <Router>  {/* Bao quanh Routes với Router */}
      <div className="App">
        <div id="wrapper">
          <SideBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/QuanlyGame" element={<QuanlyGame />} />
            <Route path="/QuanlyUser" element={<QuanlyUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
