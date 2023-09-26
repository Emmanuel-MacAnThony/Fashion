import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { BORDER_RADIUS } from "./Onboarding";
import { Text } from "../../components/Theme";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export const SLIDER_HEIGHT = 0.61 * HEIGHT;

interface SlideProps {
  right?: boolean;
  label: string;
}

const Slide: React.FC<SlideProps> = ({ label, right }) => {
  const transform = [
    { translateY: (SLIDER_HEIGHT - 100) / 2 },
    { translateX: right ? WIDTH / 2 - 50 : -WIDTH / 2 + 50 },
    { rotate: right ? "-90deg" : "90deg" },
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.labelContainer, { transform }]}>
        <Text variant="hero" style={styles.label}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
  },
  label: {
    fontSize: 80,
    fontFamily: "SFProDisplay-Bold",
    color: "white",
    lineHeight: 80,
    textAlign: "center",
  },
  labelContainer: {
    height: 100,
    justifyContent: "center",
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
    //top: BORDER_RADIUS,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
