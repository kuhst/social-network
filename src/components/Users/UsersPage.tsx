import React from "react";
import { useSelector } from "react-redux";
import Users from "./Users";
import Preloader from "../elements/Preloader";
import { getIsFetching } from "../../redux/usersSelector";

export const UsersPage = () => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
