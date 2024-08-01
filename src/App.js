import {Route, Routes, Link} from "react-router-dom";
import YDEX from "./Pages/YDEX";
import Home from "./Pages/Home";
import TCSG from "./Pages/TCSG";
import SBER from "./Pages/SBER";
import React from "react";


function App() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
    <div className="App">
      <header className="App-header d-flex justify-between">

          <div>
              <Link className="link" to={"/"}>
                  <img src="img/t-logo.svg" alt="logo"/>
              </Link>
              <span className="menu_button " onClick={() => setIsOpen(!isOpen)}>Список акций</span>
              <nav className={`menu ${isOpen ? "active" : ""}` } >
                  <ul className="menu_list">
                      <Link className="clear" to="/YDEX">
                      <li className="menu_item clear">YANDEX</li>
                      </Link>
                      <Link className="clear" to="/TCSG">
                      <li className="menu_item">TINKOFF</li>
                      </Link>
                      <Link className="clear" to="/SBER">
                      <li className="menu_item">SBER</li>
                      </Link>
                  </ul>
              </nav>
          </div>

          <div>

              <img width={22} height={22} src="img/profile.png" alt="profile"/>
              <span>Profile</span>
          </div>


      </header>


        <Routes>
            <Route path="/" element={<Home/>}>
            </Route>
            <Route path="/YDEX" element={<YDEX/>}>
            </Route>
            <Route path="/TCSG" element={<TCSG/>}>
            </Route>
            <Route path="/SBER" element={<SBER/>}>
            </Route>

        </Routes>

    </div>
    );
}

export default App;
