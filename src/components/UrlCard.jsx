import React, { useEffect, useState } from "react";
import style from "../styles/UrlCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQrcode,
  faTrash,
  faEdit,
  faChartLine,
  faInfoCircle,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  fetchEdit,
  fetchQr,
  fetchRemoveUrl,
  fetchUrlDetails,
  fetchUrls,
} from "../redux/slices/urls";
import { BASE_URL, HOST, QR_IMAGE_PATH } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const UrlCard = ({ url }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qrImageUrl, setQrImageUrl] = useState(null);

  useEffect(() => {
    if (url.qrCode) {
      setQrImageUrl(`${QR_IMAGE_PATH}/${url.qrCode}`);
    }
  }, [url.qrCode]);

  const handleDelete = (id) => {
    const isConfirmed = confirm("Вы действительно хотите удалить ссылку?");
    if (isConfirmed) {
      dispatch(fetchRemoveUrl(id));
    }
  };

  const handleDetails = (id) => {
    dispatch(fetchUrlDetails(id));
    navigate(`/urls/${id}`);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Ссылка скопирована");
    } catch (error) {
      alert("Ошибка копирования");
    }
  };

  const handleEdit = async (id) => {
    navigate(`/urls/${id}/edit`);
  };

  const handleGetQr = async (id) => {
    dispatch(fetchQr(id));
  };

  return (
    <div className={style.card} key={url.id}>
      <p>{url.name}</p>
      <a href={url.shortLink}>denzel.com/{url.shortLink}</a>
      <a href={url.originalLink}>{url.originalLink}</a>
      <div className={style.icons}>
        {qrImageUrl ? (
          <img
            className={style.qrImg}
            src={`${BASE_URL}/urls/${url.id}/qr`}
            alt="QR Code"
          />
        ) : (
          <button className={style.qrBtn} onClick={() => handleGetQr(url.id)}>
            <FontAwesomeIcon className={style.qrCode} icon={faQrcode} />
            <p>Добавить QR</p>
          </button>
        )}
        <button
          onClick={() => handleCopy(`${HOST}${url.shortLink}`)}
          className={style.button}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button className={style.button} onClick={() => handleDetails(url.id)}>
          <FontAwesomeIcon icon={faChartLine} />
        </button>
        <button className={style.button} onClick={() => handleEdit(url.id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={() => handleDelete(url.id)}
          className={style.deleteBtn}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default UrlCard;
