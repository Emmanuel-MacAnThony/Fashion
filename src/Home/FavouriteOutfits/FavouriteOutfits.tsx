import React, { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Box, useTheme } from "../../components/Theme";
import Header from "../../components/Header";
import { HomeNavigationProps } from "../../components/Navigation";
import Footer from "./Footer";
import Animated, { Layout } from "react-native-reanimated";
import Outfit from "./Outfit";
import TopCurve from "./TopCurve";

const { width: wWidth } = Dimensions.get("window");

const defaultOutfits = [
  { id: 0, color: "#BFEAF5", aspectRatio: 1, selected: false },
  { id: 1, color: "#BEECC4", aspectRatio: 200 / 145, selected: false },
  { id: 2, color: "#FFE4D9", aspectRatio: 180 / 145, selected: false },
  { id: 3, color: "#FFDDDD", aspectRatio: 180 / 145, selected: false },
  { id: 4, color: "#BFEAF5", aspectRatio: 1, selected: false },
  { id: 5, color: "#F3F0EF", aspectRatio: 120 / 145, selected: false },
  { id: 6, color: "#D5C3BB", aspectRatio: 210 / 145, selected: false },
  { id: 7, color: "#DEEFC4", aspectRatio: 160 / 145, selected: false },
];

const AnimatedView = Animated.createAnimatedComponent(View);

const FavouriteOutfits = ({
  navigation,
}: HomeNavigationProps<"FavoriteOutfits">) => {
  const [outfits, setOutfits] = useState(defaultOutfits);
  const theme = useTheme();
  const width = (wWidth - theme.spacing.m * 3) / 2;
  const [footerHeight, setFooterHeight] = useState(0);

  return (
    <Box flex={1} backgroundColor={"background"}>
      <Header
        title="Favorite Outfits"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => true }}
      />
      <Box flex={1}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.m,
            paddingBottom: footerHeight,
          }}
        >
          <AnimatedView layout={Layout.duration(3000)}>
            <Box flexDirection="row">
              <Box marginRight="m">
                {outfits
                  .filter((_, i) => i % 2 !== 0)
                  .map((outfit) => (
                    <Outfit key={outfit.id} outfit={outfit} width={width} />
                  ))}
              </Box>
              <Box>
                {outfits
                  .filter((_, i) => i % 2 === 0)
                  .map((outfit) => (
                    <Outfit key={outfit.id} outfit={outfit} width={width} />
                  ))}
              </Box>
            </Box>
          </AnimatedView>
        </ScrollView>
        <TopCurve footerHeight={footerHeight} />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => setFooterHeight(height)}
        >
          <Footer
            label="Add more to favorites"
            onPress={() => {
              setOutfits(outfits.filter((outfit) => !outfit.selected));
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FavouriteOutfits;
