import React from "react";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import {
  Flex,
  Box,
  Center,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
const Login = ({
  login,
  clearErrors,
  isLoading,
  isAuthenticated,
  RegisterError,
}) => {
  const validateUsername = (value) => {
    let error;
    if (!value) {
      error = "Required";
      return error;
    }
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  };
  const alert = (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{RegisterError.msg.msg}</AlertTitle>
    </Alert>
  );
  return (
    <>
      <Center>
        <Flex flexDir="column" m="5rem">
          <Heading size="2xl">Login</Heading>
          <Box m="2rem">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={(values, actions) => {
                const { username, password } = values;
                login({ username, password });
                if (isAuthenticated) clearErrors();
              }}
            >
              {(props) => (
                <Form>
                  {(RegisterError.status !== null && RegisterError.status != 401)  ? alert : null}

                  <Field name="username" validate={validateUsername}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <Input
                          {...field}
                          id="username"
                          placeholder="Username or Email"
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isLoading}
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  RegisterError: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
