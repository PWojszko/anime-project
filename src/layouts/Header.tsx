import React from "react";
import { Link } from "react-router-dom";

// import Navigation from "./Navigation.tsx";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo">
          Ani <span className="header__logo--bold">me</span>
        </div>
      </Link>
      {/* <Navigation /> */}
    </header>
  );
};

export default Header;
