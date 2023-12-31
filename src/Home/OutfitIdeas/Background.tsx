import { Image, View, StyleSheet } from "react-native";
import { Box, useTheme } from "../../components/Theme";
import { palette } from "../../components/Theme";

const Background = () => {
  const theme = useTheme();
  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <Box flex={1 / 3} style={{ backgroundColor: palette.lightBlue }}>
        <Box
          flex={1}
          backgroundColor="background"
          borderBottomRightRadius="xl"
        />
      </Box>
      <Box flex={1 / 3}>
        <Box flex={1} backgroundColor="background" />
        <Box flex={1} backgroundColor="secondary" />
        <Image
          source={require("./assets/background.png")}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
            borderTopLeftRadius: theme.borderRadii.xl,
            borderBottomRightRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
      <Box flex={1 / 3} style={{ backgroundColor: palette.lightBlue }}>
        <Box flex={1} backgroundColor="secondary" borderTopLeftRadius="xl" />
      </Box>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({});
