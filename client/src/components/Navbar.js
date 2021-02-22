import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { Flex, Box, Center } from "@chakra-ui/react";

const Navbar = ({ isAuthenticated, isLoading }) => {
  return (
    <>
      <Center bg="whitesmoke" h="45px">
        <Flex w="80%" justify="space-between">
          <h1>CB</h1>
          {!isLoading ? (
            <Flex w="20%" justify="space-around">
              {isAuthenticated ? (
                <Logout />
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign up</Link>{" "}
                </>
              )}
            </Flex>
          ) : null}
        </Flex>
      </Center>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps)(Navbar);
