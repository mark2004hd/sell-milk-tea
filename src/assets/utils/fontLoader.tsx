
import { useFonts } from "expo-font";

const fontLoader = () => {
  // Tải nhiều font
  const [fontsLoaded] = useFonts({
    'Outfit': require("../assets/font/Outfit-VariableFont_wght.ttf"),
    roboto: require("../assets/font/Roboto-Regular.ttf"),
    poppins: require("../assets/font/Poppins-Regular.ttf"),
  });

  // Hiển thị màn hình chờ nếu font chưa được tải
  if (!fontsLoaded) {
    return null; 
  }
}


export default fontLoader;
