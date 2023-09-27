import { StyleSheet, Image, Dimensions, StatusBar } from "react-native";
import React from "react";
import { Box, useTheme } from "./Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//@ts-ignore
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

interface ContainerProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export const assets = [require("../components/assets/1.png")];
const { width } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

const Container: React.FC<ContainerProps> = ({ children, footer }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Box flex={1} backgroundColor={"secondary"}>
      <StatusBar barStyle="light-content" />
      <Box backgroundColor={"background"}>
        <Box
          borderBottomLeftRadius={"xl"}
          overflow={"hidden"}
          height={height * 0.61}
        >
          <Image
            source={assets[0]}
            style={{
              width,
              height,
              borderBottomLeftRadius: theme.borderRadii.xl,
            }}
          />
        </Box>
      </Box>
      <Box flex={1} overflow={"hidden"}>
        <Image
          source={assets[0]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            borderBottomLeftRadius: theme.borderRadii.xl,
            top: -height * 0.61,
          }}
        />
        <Box
          flex={1}
          borderRadius={"xl"}
          borderTopLeftRadius={"o"}
          backgroundColor={"background"}
        >
          {children}
        </Box>
      </Box>
      <Box backgroundColor={"secondary"} paddingTop={"m"}>
        {footer}
        <Box height={Math.max(insets.bottom, 16)} />
      </Box>
    </Box>
  );
};

export default Container;
