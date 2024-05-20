import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEdit } from "../redux/slices/urls";

export const EditUrl = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = useSelector((state) => {
    return state.urls.items.find((item) => item.id === id);
  });

  const onSubmit = (data) => {
    dispatch(fetchEdit({ id, data }));
    alert(`Ссылка успешно изменена`);
    navigate(`/urls/${id}`);
  };

  return (
    <div>
      <h2>Редактирование ссылки</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Новое имя ссылки:
          <input defaultValue={url.name} type="text" {...register("name")} />
        </label>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};
