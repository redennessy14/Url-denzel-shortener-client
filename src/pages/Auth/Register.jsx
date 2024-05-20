import React from "react";
import style from "../../styles/Register.module.scss";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../../redux/slices/auth";
import LOGO from "../../assets/logo.png";

export const Register = () => {
  const navigate = useNavigate();
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

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }
    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token);
    }
    alert("Подтвердите регистрацию через email");
    navigate("/login");
  };
  // if (isAuth) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <img src={LOGO} alt="" className={style.logo} />
        <h2>Регистрация</h2>
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
          Регистрация
        </button>
        <Link to="/login" className={style.text}>
          У вас уже есть аккаунт ?
        </Link>
      </form>
    </div>
  );
};
