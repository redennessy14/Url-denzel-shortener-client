import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrls } from "../redux/slices/urls";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    if (userData) {
      dispatch(fetchUrls());
    }
  }, [userData]);
  return <div>Privet</div>;
};
