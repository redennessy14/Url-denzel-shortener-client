import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HOST, QR_IMAGE_PATH, BASE_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQrcode,
  faTrash,
  faEdit,
  faChartLine,
  faInfoCircle,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import style from "../styles/DetailsUrl.module.scss";
import { fetchQr, fetchUrlDetails } from "../redux/slices/urls";

export const DetailsUrl = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [qrImageUrl, setQrImageUrl] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const getUrlDetails = async () => {
      const { payload } = await dispatch(fetchUrlDetails(id));
      setUrl(payload);
    };
    getUrlDetails();
  }, []);

  useEffect(() => {
    if (url && url.qrCode) {
      setQrImageUrl(`${QR_IMAGE_PATH}/${url.qrCode}`);
    } else {
      setQrImageUrl(null);
    }
  }, [url]);

  const handleGetQr = async (id) => {
    dispatch(fetchQr(id));
  };

  return (
    <div>
      <h2>Детали ссылки</h2>
      {url && (
        <div>
          <div className={style.stats}>
            <div className={style.redirect}>
              {" "}
              <p>
                Переходы: <span>{url.redirect}</span>
              </p>
            </div>
            {qrImageUrl ? (
              <img
                className={style.qrImg}
                src={`${BASE_URL}/urls/${url.id}/qr`}
                alt="QR Code"
              />
            ) : (
              <button
                className={style.qrBtn}
                onClick={() => handleGetQr(url.id)}
              >
                <FontAwesomeIcon className={style.qrCode} icon={faQrcode} />
                <p>Добавить QR</p>
              </button>
            )}
            <div className={style.redirect}>
              <p>Уникальные пользователи: {url.uniqueUsers.length}</p>
            </div>
          </div>
          <div className={style.links}>
            {" "}
            <p>Название: {url.name}</p>
            <p>
              Короткая ссылка:
              <a href={`${HOST}${url.shortLink}`}>denzel.com/{url.shortLink}</a>
            </p>
            <p>
              Оригинальная ссылка:
              <a href={url.originalLink}>{url.originalLink}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
