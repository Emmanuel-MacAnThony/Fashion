import React, { useState } from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Box } from "../../components/Theme";
import RoundIcon from "../../components/RoundIcon";

interface OutfitProps {
  outfit: { id: number; color: string; aspectRatio: number; selected: boolean };
  width: number;
}

const Outfit = ({ outfit, width }: OutfitProps) => {
  const [selected, setSelected] = useState(false);

  const outfitSelected = () => {
    setSelected((prev) => !prev);
    outfit.selected = !outfit.selected;
  };

  return (
    <BorderlessButton onPress={outfitSelected}>
      <Box
        borderRadius="s"
        marginBottom="m"
        alignItems="flex-end"
        padding="m"
        style={{
          backgroundColor: outfit.color,
          width,
          height: width * outfit.aspectRatio,
        }}
      >
        {selected && (
          <RoundIcon
            name="check"
            backgroundColor="primary"
            color="background"
            size={24}
          />
        )}
      </Box>
    </BorderlessButton>
  );
};

export default Outfit;
