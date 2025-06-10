import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./index.css";

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to={"/login"}>SIGN IN</Link>| <Link to={"/signup"}>SIGN UP</Link>
        <Link to={"/showitem"}>SHOW ITEM</Link>|{" "}
        <Link to={"/additem"}>ADD ITEM</Link>
        <Link to={"/edititem"}>EDIT ITEM</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default App;
