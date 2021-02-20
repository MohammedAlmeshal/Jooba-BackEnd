import React from "react";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
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
const SignUp = ({ register, isLoading, isAuthenticated, RegisterError }) => {
  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Name is required";
      return error;
    }
  };

  const validateUsername = (value) => {
    let error;
    if (!value) {
      error = "Username is required";
      return error;
    }
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (!/^[A-Z0-9._%+-?]{6,16}$/i.test(value)) {
      error = "Invalid Password";
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
          <Heading size="2xl">Sign up</Heading>
          <Box m="2rem">
            <Formik
              initialValues={{
                name: "",
                username: "",
                email: "",
                password: "",
              }}
              onSubmit={(values, actions) => {
                const { name, username, email, password } = values;
                register({ name, username, email, password });
              }}
            >
              {(props) => (
                <Form>
                  {RegisterError.status !== null && RegisterError.status != 401
                    ? alert
                    : null}
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <Input {...field} id="name" placeholder="Name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

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
                          placeholder="Username"
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <Input {...field} id="email" placeholder="Email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                    Submit
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

export default connect(mapStateToProps, { register })(SignUp);
