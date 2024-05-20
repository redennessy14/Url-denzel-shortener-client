import React from "react";
import style from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../redux/slices/auth";

const Navbar = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти ?")) {
      dispatch(logout());
    }
  };
  return (
    <nav>
      <p className={style.logo}>URL DENZEL SHORTENER</p>
      <div className={style.auth}>
        {!isAuth ? (
          <>
            <Link to="/login">
              <button className={style.button}>Войти</button>
            </Link>
            <Link to="/register">
              <button className={style.button}>Регистрация</button>
            </Link>
          </>
        ) : (
          <>
            <button onClick={onClickLogout} className={style.button}>
              Выйти
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
