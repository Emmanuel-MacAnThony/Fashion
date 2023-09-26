import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface AuthNavigationProps<RouteName extends keyof Routes> {
  navigation: StackNavigationProp<Routes, RouteName>;
  route: RouteProp<Routes, RouteName>;
}

export type Routes = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
};
