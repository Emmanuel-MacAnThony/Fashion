import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box } from "../../components/Theme";
import Header from "../../components/Header";
import Categories from "./Categories";
import Background from "./Background";
import Card from "./Card";
import { useTiming } from "react-native-redash";

const cards = [
  { index: 3, source: require("../../Authentication/assets/5.png") },
  { index: 2, source: require("../../Authentication/assets/5.png") },
  { index: 1, source: require("../../Authentication/assets/5.png") },
  { index: 0, source: require("../../Authentication/assets/5.png") },
];

const step = 1 / (cards.length - 1);

const OutfitIdeas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedIndex = useTiming(currentIndex);
  return (
    <Box flex={1} backgroundColor={"background"}>
      <Header
        title="Outfit Ideas"
        left={{ icon: "menu", onPress: () => true }}
        right={{ icon: "shopping-bag", onPress: () => true }}
      />
      <Categories />
      <Box flex={1}>
        <Background />
        {cards.map(
          ({ index, source }) =>
            currentIndex < index * step + step && (
              <Card
                key={index}
                index={index}
                animatedIndex={animatedIndex}
                step={step}
                onSwipe={() => setCurrentIndex((prev) => prev + step)}
                {...{ source }}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;

const styles = StyleSheet.create({});
