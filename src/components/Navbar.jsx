import React from "react";
import style from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <p className={style.logo}>URL DENZEL SHORTENER</p>
      <div className={style.auth}>
        {" "}
        <Link to="/login">
          <button className={style.button}>Войти</button>
        </Link>
        <Link to="/register">
          <button className={style.button}>Регистрация</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
