import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { getProfile, askQuestion } from "../actions";
import { Spinner } from "@chakra-ui/react";

const Home = ({
  isAuthenticated,
  getProfile,
  askQuestion,
  match,
  user,
  profile,
  isLoading,
}) => {
  const { username } = match.params;
  const isOwner = isAuthenticated && user.username === username ? true : false;

  console.log(isLoading);
  useEffect(() => {
    getProfile(username);
  }, [isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Profile
          askQuestion={askQuestion}
          isOwner={isOwner}
          user={profile}
        ></Profile>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profiles.profile,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.profiles.isLoading,
  };
};
export default connect(mapStateToProps, { getProfile, askQuestion })(Home);
