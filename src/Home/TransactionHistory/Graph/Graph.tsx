import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { Box, Theme, useTheme } from "../../../components/Theme";
import Underlay, { MARGIN } from "./Underlay";
import moment from "moment";
import { lerp } from "./Scale";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

export interface DataPoint {
  id: number;
  date: string;
  value: number;
  color: keyof Theme["colors"];
}

interface GraphProps {
  data: DataPoint[];
  startDate: string;
  numberOfMonths: number;
}

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;

const AnimatedBox = Animated.createAnimatedComponent(Box);
const Graph: React.FC<GraphProps> = ({ numberOfMonths, data, startDate }) => {
  const theme = useTheme();
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspectRatio;
  const width = canvasWidth - theme.spacing[MARGIN];
  const height = canvasHeight - theme.spacing[MARGIN];

  const step = width / numberOfMonths;
  const values = data.map((p) => p.value);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  const transition = useSharedValue(0);
  useFocusEffect(() => {
    transition.value = withTiming(1, { duration: 650 });
    return () => (transition.value = 0);
  });

  return (
    <Box marginTop={"l"} paddingBottom={MARGIN} paddingLeft={MARGIN}>
      <Underlay
        minY={minY}
        maxY={maxY}
        startDate={startDate}
        numberOfMonths={numberOfMonths}
        step={step}
      />
      <View style={{ width, height, overflow: "hidden" }}>
        {data.map((point) => {
          const i = Math.round(
            moment.duration(moment(point.date).diff(startDate)).asMonths()
          );
          const totalHeight = lerp(0, height, point.value / maxY);
          const style = useAnimatedStyle(() => {
            const currentHeight = totalHeight * transition.value;
            const translateY = totalHeight - currentHeight;
            return {
              transform: [{ translateY }, { scaleY: transition.value }],
            };
          });

          return (
            <AnimatedBox
              key={point.id}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={totalHeight}
              style={style}
            >
              <Box
                backgroundColor={point.color}
                opacity={0.1}
                position="absolute"
                top={0}
                bottom={0}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderTopLeftRadius="m"
                borderTopRightRadius="m"
              />
              <Box
                backgroundColor={point.color}
                position="absolute"
                top={0}
                height={32}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderRadius="m"
              />
            </AnimatedBox>
          );
        })}
      </View>
    </Box>
  );
};

export default Graph;

const styles = StyleSheet.create({});
