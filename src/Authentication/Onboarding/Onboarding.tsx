import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import Slide, { SLIDER_HEIGHT } from "./Slide";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
  useAnimatedRef,
} from "react-native-reanimated";
import SubSlide from "./SubSlide";
import Dot from "./Dot";

const { width: WIDTH } = Dimensions.get("window");
export const BORDER_RADIUS = 75;

const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
    picture: require("../assets/1.png"),
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfits ideas",
    color: "#BEECC4",
    picture: require("../assets/2.png"),
  },
  {
    title: "Eccentric",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday",
    color: "#FFE4D9",
    picture: require("../assets/3.png"),
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
    picture: require("../assets/4.png"),
  },
];

const Onboarding = () => {
  const x = useSharedValue(0);
  const currentIndex = useDerivedValue(() => x.value / WIDTH);
  const scroll = useAnimatedRef<Animated.ScrollView>();
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      x.value,
      slides.map((_, i) => i * WIDTH),
      slides.map((slide) => slide.color)
    )
  );

  const rSlider = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const rBackground = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const rFooterStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, rSlider]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={WIDTH}
          decelerationRate={"fast"}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ref={scroll}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide
              key={index}
              right={!!(index % 2)}
              label={title}
              picture={picture}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFill, rBackground]} />
        <Animated.View style={[styles.footerContent]}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} index={index} currentIndex={currentIndex} />
            ))}
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                width: WIDTH * slides.length,
              },
              rFooterStyle,
            ]}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;
              return (
                <SubSlide
                  key={index}
                  onPress={() => {
                    if (scroll.current) {
                      scroll.current.scrollTo({
                        x: WIDTH * (index + 1),
                        animated: true,
                      });
                    }
                  }}
                  {...{ subtitle, description, last }}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
});
