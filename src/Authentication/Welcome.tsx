import { Image, Dimensions } from "react-native";
import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Box, Text, useTheme } from "../components/Theme";
import { Button } from "../components";
import { AuthNavigationProps } from "../components/Navigation";

const picture = {
  src: require("../Authentication/assets/5.png"),
  width: 3383,
  height: 5074,
};

const { width: WIDTH } = Dimensions.get("window");

const Welcome = ({ navigation }: AuthNavigationProps<"Welcome">) => {
  const theme = useTheme();
  return (
    <Box flex={1} backgroundColor={"background"}>
      <Box
        flex={1}
        borderBottomRightRadius={"xl"}
        backgroundColor="background2"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Image
          source={picture.src}
          style={{
            width: WIDTH - theme.borderRadii.xl,
            height:
              (WIDTH - theme.borderRadii.xl) * (picture.height / picture.width),
          }}
        />
      </Box>
      <Box flex={1} borderTopLeftRadius={"xl"}>
        <Box
          backgroundColor={"background2"}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
        <Box
          backgroundColor={"background"}
          borderTopLeftRadius={"xl"}
          flex={1}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          padding={"xl"}
        >
          <Text variant="title2">Let's get started</Text>
          <Text variant="body" textAlign="center">
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={() => console.log("")}
          />
          <Button
            label="Join us, it's Free"
            onPress={() => () => console.log("")}
          />
          <BorderlessButton onPress={() => () => console.log("")}>
            <Text variant="button" color="secondary">
              Forgot password?
            </Text>
          </BorderlessButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
