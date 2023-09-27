import React, { useRef } from "react";
import { Button, Container } from "../components";
import Footer from "./components/Footer";
import { AuthNavigationProps } from "../components/Navigation";
import { Box, Text } from "../components/Theme";
import TextInput from "../components/Form/TextInput";
import Checkbox from "../components/Form/Checkbox";
import { BorderlessButton } from "react-native-gesture-handler";
import { useFormik } from "formik";
import { TextInput as RNTextInput } from "react-native";
import * as Yup from "yup";

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "", remember: false },
    onSubmit: () => console.log(""),
  });
  const password = useRef<RNTextInput>(null);
  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => console.log("signuo")}
    />
  );

  return (
    <Container footer={footer}>
      <Box padding={"xl"}>
        <Text variant={"title1"} textAlign={"center"} marginBottom={"l"}>
          Welcome Back
        </Text>
        <Text textAlign={"center"} variant={"body"} marginBottom={"l"}>
          Use your credentials below and login to your account
        </Text>
        <Box marginBottom={"m"}>
          <TextInput
            icon="mail"
            placeholder="Enter your email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            autoComplete="email"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => password.current?.focus()}
          />
        </Box>
        <Box>
          <TextInput
            ref={password}
            icon="lock"
            placeholder="Enter your password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoComplete="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
            secureTextEntry
          />
        </Box>
        <Box
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginVertical={"l"}
        >
          <Checkbox
            label="Remember me"
            checked={values.remember}
            onChange={() => setFieldValue("remember", !values.remember)}
          />
          <BorderlessButton onPress={() => console.log("")}>
            <Text variant="button" color="primary">
              Forgot Password
            </Text>
          </BorderlessButton>
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            label="Log into your account"
            onPress={() => {}}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
