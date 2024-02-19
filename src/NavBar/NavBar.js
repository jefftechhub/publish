import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useAxios } from "../useAxios";

const NavBar = () => {
  const [navBtns, setNavBtns] = useState([]);
  const urlNavs = "/api/navBtns";

  const { loading, error, data } = useAxios(urlNavs);

  useEffect(() => {
    if (data) {
      setNavBtns(data);
    }
  }, [data]);

  return (
    <nav>
      <div className="logo">
        <h1>nasi news</h1>
        <p>Providing you with the detailed information</p>
      </div>

      {loading ? (
        <div className="loading-nav-container">
          <h3>loading...</h3>
        </div>
      ) : (
        <div className="nav-btn">
          <Labels navBtns={navBtns} />
        </div>
      )}
    </nav>
  );
};

const Labels = ({ navBtns }) => {
  const btnsArray = ["home", ...navBtns];

  return (
    <div className="btn">
      {btnsArray.map((btn, index) => {
        if (btn === "home") {
          return (
            <Link to={"/"} key={index}>
              {btn}
            </Link>
          );
        } else {
          return (
            <Link to={`/${btn}`} key={index}>
              {btn}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default NavBar;
