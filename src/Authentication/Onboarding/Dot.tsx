import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";

interface DotProps {
  index: number;
  currentIndex: Animated.SharedValue<number>;
}

const Dot: React.FC<DotProps> = ({ index, currentIndex }) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      backgroundColor: "#2CB9B0",
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 4,
      transform: [{ scale }],
    };
  });
  return <Animated.View style={style} />;
};

export default Dot;
