import React from "react";
import { logout } from "../actions/authActions";
import { connect } from "react-redux";
import { Box } from "@chakra-ui/react";

const Logout = ({ logout }) => {
  return (
    <>
      <a onClick={() => logout()}>Logout</a>
    </>
  );
};
export default connect(null, { logout })(Logout);
