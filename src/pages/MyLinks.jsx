import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrls } from "../redux/slices/urls";
import UrlCard from "../components/UrlCard";
import style from "../styles/MyLinks.module.scss";

export const MyLinks = () => {
  const userData = useSelector((state) => state.auth.data);
  const urlItems = useSelector((state) => state.urls.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(fetchUrls());
    }
  }, [userData]);

  return (
    <div className={style.container}>
      <h2>Список ссылок</h2>
      {urlItems.length > 0 ? (
        <div>
          {urlItems.map((url, id) => (
            <UrlCard key={id} url={url} />
          ))}
        </div>
      ) : (
        <p>Ссылки не найдены</p>
      )}
    </div>
  );
};
