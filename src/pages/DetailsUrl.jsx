import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUrlDetails } from "../redux/slices/urls";

export const DetailsUrl = () => {
  const { id } = useParams();

  const url = useSelector((state) => {
    return state.urls.items.find((item) => item.id === id);
  });

  console.log(url, "urls");
  return (
    <div>
      <h2>Детали ссылки</h2>
      {url && (
        <div>
          <p>QR: {url.qrCode}</p>
          <p>Название: {url.name}</p>
          <p>Короткая ссылка: {url.shortLink}</p>
          <p>Оригинальная ссылка: {url.originalLink}</p>
          <p>Переходы: {url.redirect}</p>
          <p>Уникальные пользователи: {url.uniqueUsers.length}</p>
        </div>
      )}
    </div>
  );
};
