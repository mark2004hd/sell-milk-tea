import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { ActivityIndicator, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import styleIntroduce from "../style/styleIntroduce";

const Introduce = () => {
	// Tải font
	const [fontsLoaded] = useFonts({
		Outfit: require("../components/font/Outfit-VariableFont_wght.ttf"),
	});

	// Kiểm tra nếu font chưa được tải
	if (!fontsLoaded) {
		return (
			<SafeAreaView style={styleIntroduce.container}>
				<ActivityIndicator size="large" color="#000" />
			</SafeAreaView>
		);
	}

	return (
		<NavigationContainer>
			<SafeAreaView style={styleIntroduce.container}>
				<StatusBar hidden={true} />

				<TouchableOpacity>
					<View>
						<Image
							source={{
								uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/MJ_20241115_142131.png",
							}}
							style={styleIntroduce.img}
						/>
					</View>
				</TouchableOpacity>
				<View>
					<View>
						<Text style={[styleIntroduce.Header, { fontFamily: "Outfit" }]}>
							Coffee Mitang
						</Text>
						<Text style={styleIntroduce.Text1}>Handmade milk tea</Text>
					</View>
					<View style={styleIntroduce.coffe}>
						<Image
							source={{
								uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/Frame1.png",
							}}
							style={styleIntroduce.coffeIMG}
						/>
					</View>
					<Text style={styleIntroduce.version}>Version 2.0.3</Text>
				</View>
			</SafeAreaView>
		</NavigationContainer>
	);
};

export default Introduce;
