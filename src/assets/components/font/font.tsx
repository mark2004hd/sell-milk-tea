import { useFonts } from "expo-font";
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface CustomTextProps extends TextProps {
	fontFamily?: "Inter" | "Montserrat" | "InterMedium"; // Chọn font chữ
	fontSize?: number; // Kích thước chữ tùy chỉnh
	style?: TextStyle | TextStyle[]; // Thêm các style khác
}

const CustomText = ({
	fontFamily = "Inter", // Mặc định sử dụng font Inter
	fontSize = 16, // Mặc định kích thước chữ là 16
	style,
	children,
	...props
}: CustomTextProps) => {
	// Tải font chữ với expo-font
	const [fontLoaded] = useFonts({
		Inter: require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
		InterReguler: require("../assets/fonts/Inter_28pt-Regular.ttf"),
		InterMedium: require("../assets/fonts/Inter_28pt-Medium.ttf"),
		Montserrat: require("../assets/fonts/Montserrat-SemiBold.ttf"),
	});

	if (!fontLoaded) {
		return <Text>Loading...</Text>; // Hiển thị "Loading..." khi font chưa tải xong
	}

	return (
		<Text
			style={[
				{ fontFamily, fontSize }, // Áp dụng fontFamily và fontSize
				style, // Áp dụng các style ngoài
			]}
			{...props}>
			{children}
		</Text>
	);
};

export default CustomText;
