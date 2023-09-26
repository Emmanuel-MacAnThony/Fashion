import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "../../components";

interface SubSlideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

const SubSlide: React.FC<SubSlideProps> = ({
  subtitle,
  description,
  last,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
        onPress={onPress}
      />
    </View>
  );
};

export default SubSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
  },
  description: {
    fontFamily: "SFProDisplay-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#0C0D34",
    textAlign: "center",
    marginBottom: 40,
  },
  subTitle: {
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 24,
    color: "#0C0D34",
    lineHeight: 30,
    marginBottom: 12,
    textAlign: "center",
  },
});
