import React, { useRef } from "react";
import { Button, Container } from "../components";
import Footer from "./components/Footer";
import { AuthNavigationProps } from "../components/Navigation";
import { Box, Text } from "../components/Theme";
import TextInput from "../components/Form/TextInput";
import { useFormik } from "formik";
import { TextInput as RNTextInput } from "react-native";
import * as Yup from "yup";

const SignUp = ({ navigation }: AuthNavigationProps<"SignUp">) => {
  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string()
      .equals([Yup.ref("password")], "Passwords don't match")
      .required("Required"),
  });

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: SignUpSchema,
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit: () => console.log(""),
    }
  );
  const password = useRef<RNTextInput>(null);
  const confirmPassword = useRef<RNTextInput>(null);
  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );

  return (
    <Container footer={footer} pattern={1}>
      <Box padding={"xl"}>
        <Text variant={"title1"} textAlign={"center"} marginBottom={"l"}>
          Create Account
        </Text>
        <Text textAlign={"center"} variant={"body"} marginBottom={"l"}>
          Let us know your name, email, and your password
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
        <Box marginBottom={"m"}>
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
        <TextInput
          ref={confirmPassword}
          icon="lock"
          placeholder="Confirm your password"
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          autoComplete="password"
          autoCapitalize="none"
          returnKeyType="go"
          returnKeyLabel="go"
          onSubmitEditing={() => handleSubmit()}
          secureTextEntry
        />
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            label="Create your account"
            onPress={() => {}}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
