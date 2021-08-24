import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  responseUsers,
  FilterType,
} from "../../redux/UsersReducer";
import Users from "./Users";
import Preloader from "../elements/Preloader";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getUserFilter,
  getUsers,
  getUsersCount,
  getUsersCountOnPage,
} from "../../redux/usersSelector";
import { AppStateType } from "../../redux/ReduxStore";
import { UserType } from "../../type/type";

type MapStatePropsType = {
  usersCountOnPage: number;
  currentPage: number;
  isFetching: boolean;
  usersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type MapDispatchToProps = {
  getUsers: (
    usersCountOnPage: number,
    currentPage: number,
    filter: FilterType
  ) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

type PropsType = MapStatePropsType & MapDispatchToProps;

class UsersAPIComponent extends React.Component<PropsType> {
  componentDidMount = () => {
    this.props.getUsers(this.props.usersCountOnPage, this.props.currentPage, {
      term: "",
      friend: "",
    });
  };
  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(
      this.props.usersCountOnPage,
      pageNumber,
      this.props.filter
    );
  };
  onFilterChanged = (filter: FilterType) => {
    this.props.getUsers(this.props.usersCountOnPage, 1, filter);
  };
  render = () => {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            usersCount={this.props.usersCount}
            usersCountOnPage={this.props.usersCountOnPage}
            currentPage={this.props.currentPage}
            users={this.props.users}
            followingInProgress={this.props.followingInProgress}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            onPageChanged={this.onPageChanged}
            onFilterChanged={this.onFilterChanged}
          />
        )}
        ;
      </>
    );
  };
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    usersCount: getUsersCount(state),
    usersCountOnPage: getUsersCountOnPage(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUserFilter(state),
  };
};

const UsersContainer = connect(mapStateToProps, {
  follow,
  unfollow,
  getUsers: responseUsers,
})(UsersAPIComponent);

export default UsersContainer;
