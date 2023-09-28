import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Box, Theme, Text, useTheme } from "../components/Theme";
import { HomeRoutes } from "../components/Navigation";
import RoundIcon from "../components/RoundIcon";

interface BaseDrawerItem {
  icon: string;
  label: string;
  color: keyof Theme["colors"];
}

interface ScreenDrawerItem extends BaseDrawerItem {
  screen: keyof HomeRoutes;
}

interface OnPressDrawerItem extends BaseDrawerItem {
  onPress: (navigation: ReturnType<typeof useNavigation>) => void;
}

export type DrawerItemProps = ScreenDrawerItem | OnPressDrawerItem;

const DrawerItem: React.FC<DrawerItemProps> = ({
  icon,
  label,
  color,
  ...props
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <RectButton
      onPress={() =>
        "screen" in props
          ? //@ts-ignore
            navigation.navigate(props.screen)
          : props.onPress(navigation)
      }
      style={{ borderRadius: theme.borderRadii.m }}
    >
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundIcon
          name={icon}
          backgroundColor={color}
          iconRatio={0.5}
          color="background"
          size={36}
        />
        <Text variant="button" color="secondary" marginLeft="m">
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
