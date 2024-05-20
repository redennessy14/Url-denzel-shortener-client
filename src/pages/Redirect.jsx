import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRedirect } from "../redux/slices/redirect";

export const Redirect = () => {
  const dispatch = useDispatch();
  const { shortLink } = useParams();
  const { data } = useSelector((state) => state.redirect);

  useEffect(() => {
    if (shortLink) {
      dispatch(fetchRedirect({ shortLink }));
    }
  }, [dispatch, shortLink]);
  if (data) {
    window.location.href = data;
    return null;
  }
  console.log(data, "Redux data");
  return <div>redirect</div>;
};
