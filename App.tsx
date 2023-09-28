import * as React from "react";
import { LoadAssets } from "./src/components";
import { ThemeProvider } from "./src/components/Theme";
import { AuthenticationNavigator } from "./src/Authentication";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator } from "./src/Home";

type AppStackRoutes = {
  Authentication: undefined;
  Home: undefined;
};

const AppStack = createStackNavigator<AppStackRoutes>();

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
};

export default function App() {
  return (
    <ThemeProvider>
      <LoadAssets {...{ fonts }}>
        <SafeAreaProvider>
          <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
            <AppStack.Screen name="Home" component={HomeNavigator} />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}
