import React, { useEffect } from "react";

import s from "./Users.module.css";
import User from "./User";
import Paginator from "../elements/Paginator";
import UsersSearchForm from "./UsersSearchForm";
import {
  FilterType,
  follow,
  responseUsers,
  unfollow,
} from "../../redux/UsersReducer";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getUserFilter,
  getUsers,
  getUsersCount,
  getUsersCountOnPage,
} from "../../redux/usersSelector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Pagination, Spin } from "antd";

type PropsType = {};

type QueryParamsType = { term?: string; page?: string; friend?: string };

const UsersPage: React.FC<PropsType> = React.memo((props) => {
  const users = useSelector(getUsers);
  const usersCount = useSelector(getUsersCount);
  const usersCountOnPage = useSelector(getUsersCountOnPage);
  const currentPage = useSelector(getCurrentPage);
  const followingInProgress = useSelector(getFollowingInProgress);
  const filter = useSelector(getUserFilter);
  const isFetching = useSelector(getIsFetching);

  const dispatch = useDispatch();
  const history = useHistory();
  const querystring = require("querystring");

  useEffect(() => {
    const parsed = querystring.parse(
      history.location.search.substr(1)
    ) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;
    if (parsed.page) actualPage = +parsed.page;
    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term };
    if (parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend:
          parsed.friend === "null"
            ? null
            : parsed.friend === "true"
            ? true
            : false,
      };

    console.log(parsed);
    dispatch(responseUsers(usersCountOnPage, actualPage, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      search: querystring.stringify(query),
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number, pageSize?: number) => {
    dispatch(responseUsers(pageSize || usersCountOnPage, pageNumber, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(responseUsers(usersCountOnPage, 1, filter));
  };

  const followUser = (userId: number) => {
    dispatch(follow(userId));
  };

  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId));
  };

  let usersItems = users.map((u) => (
    <User
      key={u.id}
      user={u}
      followingInProgress={followingInProgress}
      unfollow={unfollowUser}
      follow={followUser}
    />
  ));

  return (
    <div>
      <UsersSearchForm
        isFetching={isFetching}
        onFilterChanged={onFilterChanged}
      />
      <div className={s.pages}>
        <Pagination
          current={currentPage}
          total={usersCount}
          onChange={onPageChanged}
          pageSize={usersCountOnPage}
          pageSizeOptions={["12", "24", "48"]}
          disabled={isFetching}
          style={{ marginTop: 15, marginBottom: 15 }}
        />
      </div>
      {isFetching ? (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        <div className={s.usersPage}>{usersItems}</div>
      )}
    </div>
  );
});

export default UsersPage;
