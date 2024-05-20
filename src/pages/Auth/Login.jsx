import React from "react";
import style from "../../styles/Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import LOGO from "../../assets/logo.png";

export const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const isAuth = useSelector(selectIsAuth);

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log(values);

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if (data.payload.user) {
      localStorage.setItem("token", data.payload.accessToken);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <img src={LOGO} alt="" className={style.logo} />
        <h2>Войти в аккаунт</h2>
        <input
          className={style.input}
          type="email"
          placeholder="Почта"
          {...register("email", { required: "Укажите почту" })}
        />
        <input
          className={style.input}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: "Укажите пароль" })}
        />
        <button className={style.button} type="submit">
          Войти
        </button>
        <Link to="/register" className={style.text}>
          У вас еще нету аккаунта ?
        </Link>
      </form>
    </div>
  );
};
