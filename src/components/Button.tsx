import { StyleSheet, Text } from "react-native";
import React from "react";
import { RectButtonProperties, RectButton } from "react-native-gesture-handler";

interface ButtonProps {
  variant?: "default" | "primary";
  label: string;
  onPress: () => void;
  style?: RectButtonProperties["style"];
}

const Button: React.FC<ButtonProps> = ({ variant, label, onPress }) => {
  const backgroundColor =
    variant === "primary" ? "#2CB9B0" : "rgba(12,13,52, 0.05)";
  const color = variant === "primary" ? "white" : "#0C0D34";
  return (
    <RectButton
      style={[styles.container, { backgroundColor: backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color: color }]}>{label}</Text>
    </RectButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontFamily: "SFProDisplay-Regular",
    textAlign: "center",
  },
});
