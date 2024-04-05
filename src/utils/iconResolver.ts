import { ImageSourcePropType } from "react-native";

export const resolveIcon = (iconName: string): ImageSourcePropType | undefined => {
    const iconMappings: Record<string, ImageSourcePropType> = {
      main: require("../assets/icons/main.png"),
      wallet: require("../assets/icons/wallet.png")
    };
  
    return iconMappings[iconName];
  };