import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import {
	ActivityIndicator,
	Animated,
	Image,
	SafeAreaView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import styleIntroduce from "../style/styleIntroduce";

// Define the RootStackParamList type
type RootStackParamList = {
	Introduce: undefined;
	Login: undefined;
};

type IntroduceScreenNavigationProp = StackNavigationProp<RootStackParamList, "Introduce">;

const Introduce = ({ navigation }: { navigation: IntroduceScreenNavigationProp }) => {
	const [fontsLoaded] = useFonts({
		Outfit: require("../font/Outfit-VariableFont_wght.ttf"),
	});

	// Tạo giá trị Animated cho hiệu ứng mờ dần
	const fadeAnim = React.useRef(new Animated.Value(0.2)).current;
	const scaleAnim = React.useRef(new Animated.Value(0.5)).current; // Scale
	const slideAnim = React.useRef(new Animated.Value(100)).current;

	// Hiệu ứng fade-in và điều hướng
	useEffect(() => {
		// Fade in
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1500,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 1500,
				useNativeDriver: true,
			}),
			Animated.spring(slideAnim, {
				toValue: 0,
				friction: 8,
				tension: 40,
				useNativeDriver: true,
			}),
		]).start();

		// Fade out sau 2 giây, sau đó điều hướng
		const fadeOutTimer = setTimeout(() => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 500, // Thời gian mờ dần
				useNativeDriver: true,
			}).start(() => {
				navigation.replace("Login");
			});
		}, 2000);

		return () => clearTimeout(fadeOutTimer);
	}, [fadeAnim, scaleAnim, slideAnim, navigation]);
	if (!fontsLoaded) {
		return (
			<SafeAreaView style={styleIntroduce.container}>
				<ActivityIndicator size="large" color="#000" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styleIntroduce.container}>
			<StatusBar hidden={true} />
			<Animated.View
				style={{
					opacity: fadeAnim,
					transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
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
			</Animated.View>
		</SafeAreaView>
	);
};

export default Introduce;
