import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "./src/Authentication/Onboarding/Onboarding";
import { LoadAssets } from "./src/components";

const AuthenticationStack = createStackNavigator();

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
};

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="OnBoarding" component={Onboarding} />
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <AuthenticationNavigator />
    </LoadAssets>
  );
}
