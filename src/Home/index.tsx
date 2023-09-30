import { createDrawerNavigator } from "@react-navigation/drawer";
import OutfitIdeas from "./OutfitIdeas/OutfitIdeas";
import { HomeRoutes } from "../components/Navigation";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";
import FavouriteOutfits from "./FavouriteOutfits/FavouriteOutfits";

const Drawer = createDrawerNavigator<HomeRoutes>();

export const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: DRAWER_WIDTH },
      }}
      drawerContent={() => <DrawerContent />}
    >
      <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
      <Drawer.Screen name="FavoriteOutfits" component={FavouriteOutfits} />
    </Drawer.Navigator>
  );
};
