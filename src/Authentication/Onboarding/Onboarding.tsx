import { StyleSheet, View, Dimensions, Image } from "react-native";
import React from "react";
import Slide, { SLIDER_HEIGHT } from "./Slide";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
  useAnimatedRef,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import SubSlide from "./SubSlide";
import Dot from "./Dot";
import { makeStyles, Theme } from "../../components/Theme";
import { AuthNavigationProps, Routes } from "../../components/Navigation";

const { width: WIDTH } = Dimensions.get("window");
export const BORDER_RADIUS = 75;

const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
    picture: {
      src: require("../assets/1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfits ideas",
    color: "#BEECC4",
    picture: {
      src: require("../assets/2.png"),
      width: 2791,
      height: 4064,
    },
  },
  {
    title: "Eccentric",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday",
    color: "#FFE4D9",
    picture: {
      src: require("../assets/3.png"),
      width: 2738,
      height: 4064,
    },
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
    picture: {
      src: require("../assets/4.png"),
      width: 1757,
      height: 2551,
    },
  },
];

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const styles = useStyles();
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
        {slides.map(({ picture }, index) => {
          const rOpacity = useAnimatedStyle(() => {
            const opacity = interpolate(
              x.value,
              [(index - 0.5) * WIDTH, index * WIDTH, (index + 0.5) * WIDTH],
              [0, 1, 0],
              Extrapolate.CLAMP
            );

            return { opacity };
          });
          return (
            <Animated.View style={[styles.underlay, rOpacity]} key={index}>
              <Image
                source={picture.src}
                style={{
                  width: WIDTH - BORDER_RADIUS,
                  height:
                    (WIDTH - BORDER_RADIUS) * (picture.height / picture.width),
                }}
              />
            </Animated.View>
          );
        })}
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
          {slides.map(({ title }, index) => (
            <Slide
              key={index}
              right={!!(index % 2)}
              label={title}
              //picture={picture}
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
                    if (last) {
                      navigation.navigate("Welcome");
                    } else {
                      scroll?.current?.scrollTo({
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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomEndRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
    borderBottomRightRadius: theme.borderRadii.xl,
  },
}));
