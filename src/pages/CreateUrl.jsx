import React from "react";
import style from "../styles/CreateUrl.module.scss";
import { useForm } from "react-hook-form";
import LOGO from "../assets/logo.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const CreateUrl = () => {
  const userData = useSelector((state) => state.auth.data?.user);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const values = {
        name: formData.name,
        originalLink: formData.originalLink,
        userId: userData ? userData.id : null,
      };
      const { data } = await axios.post(`${BASE_URL}/urls`, values);
      alert(`Ссылка ${values.name} успешно создана`);
      navigate(`/my-links`);
      return data;
    } catch (error) {
      alert(error.response?.data?.message || "Ошибка создания ссылки");
    }
  };

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(handleCreate)}>
        <img src={LOGO} alt="Logo" className={style.logo} />
        <h2>Создание короткой ссылки</h2>
        <input
          className={style.input}
          type="text"
          placeholder="Название ссылки"
          {...register("name", { required: "Укажите название ссылки" })}
        />
        {errors.name && <p className={style.error}>{errors.name.message}</p>}
        <input
          className={style.input}
          type="text"
          placeholder="https://example.com/my-long-url"
          {...register("originalLink", { required: "Укажите ссылку" })}
        />
        {errors.originalLink && (
          <p className={style.error}>{errors.originalLink.message}</p>
        )}
        <button className={style.button} type="submit" disabled={!isValid}>
          Создать
        </button>
      </form>
    </div>
  );
};
