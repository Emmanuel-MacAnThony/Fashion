import { StyleSheet, View } from "react-native";
import React from "react";
import { Container } from "../components";
import Footer from "./components/Footer";
import { AuthNavigationProps } from "../components/Navigation";

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => console.log("signuo")}
    />
  );

  return (
    <Container footer={footer}>
      <View />
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({});
