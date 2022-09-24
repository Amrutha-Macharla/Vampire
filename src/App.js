import './App.css';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import firebase from './FirebaseAuth.js';
import Mypage from './Components/Client/Mypage';
import Addpost from './Components/Addpost/Addpost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* ===================================== User Route's ================================ */}
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/:id" element={<Mypage />} />
          <Route path="/puaddpost" element={<Addpost type="public"/>} />
          <Route path="/praddpost" element={<Addpost type="private"/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
