import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Box, Text } from "../../components/Theme";
import SocialLogin from "./SocialLogin";

interface FooterProps {
  title: string;
  action: string;
  onPress: () => void;
}

const Footer = ({ title, action, onPress }: FooterProps) => {
  return (
    <>
      <SocialLogin />
      <Box alignItems="center" marginTop="m">
        <BorderlessButton {...{ onPress }}>
          <Text variant="header" color="background">
            <Text variant={"white"} marginHorizontal={"l"}>{`${title} `}</Text>
            <Text variant={"button"} color="primary">
              {action}
            </Text>
          </Text>
        </BorderlessButton>
      </Box>
    </>
  );
};

export default Footer;
