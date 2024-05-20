import React, { useState } from "react";
import style from "../styles/Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faLink,
  faArrowLeft,
  faArrowRight,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LOGO from "../assets/logo.png";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <Link to="/" className={style.logoBlock}>
        {" "}
        <img className={style.logo} src={LOGO} alt="" />
      </Link>
      <button className={style.toggleButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
      </button>
      {!collapsed ? (
        <>
          <div className={style.links}>
            <Link to="/" className={style.link}>
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>
            <Link to="/my-links" className={style.link}>
              <FontAwesomeIcon icon={faLink} />
              <span>My Links</span>
            </Link>
            <Link to="/" className={style.link}>
              <FontAwesomeIcon icon={faQrcode} />
              <span>QR Code</span>
            </Link>
            <Link to="/" className={style.link}>
              <FontAwesomeIcon icon={faChartBar} />
              <span>Dashboard</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className={style.links}>
            <Link to="/" className={style.link}>
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link to="/my-links" className={style.link}>
              <FontAwesomeIcon icon={faLink} />
            </Link>
            <Link to="/" className={style.link}>
              <FontAwesomeIcon icon={faQrcode} />
            </Link>
            <Link to="/" className={style.link}>
              <FontAwesomeIcon icon={faChartBar} />
            </Link>
          </div>
        </>
      )}
      <Link to="/create-url">
        {" "}
        <button>Create New Link</button>
      </Link>
    </div>
  );
};

export default Sidebar;
