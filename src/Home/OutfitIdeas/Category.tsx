import { StyleSheet, View, Pressable } from "react-native";
import React, { useState } from "react";
import { Box, Text } from "../../components/Theme";

interface CategoryProps {
  category: {
    id: string;
    title: string;
    color: string;
  };
}

const OUTER_RADIUS = 34;
const INNER_RADIUS = 30;

const Category: React.FC<CategoryProps> = ({
  category: { color: backgroundColor, title },
}) => {
  const [selected, setSelected] = useState(false);
  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => setSelected((prev) => !prev)}
    >
      <Box marginLeft="m" marginTop="s" alignItems="center">
        <Box
          width={OUTER_RADIUS * 2}
          height={OUTER_RADIUS * 2}
          justifyContent="center"
          alignItems="center"
        >
          {selected && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: OUTER_RADIUS,
                borderColor: backgroundColor,
                borderWidth: 1,
              }}
            />
          )}
          <View
            style={{
              width: INNER_RADIUS * 2,
              height: INNER_RADIUS * 2,
              borderRadius: INNER_RADIUS,
              backgroundColor,
            }}
          />
        </Box>
        <Text variant={"body"} textAlign="center" marginTop="s">
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Category;
