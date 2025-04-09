import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Introduce from "../screens/Introduce";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import VerificationCode from "../screens/VerificationCode";

// Định nghĩa kiểu cho RootStackParamList
type RootStackParamList = {
	Introduce: undefined;
	Signup: undefined;
	Login: undefined;
	VerificationCode: undefined;
	// HomeScreen: undefined;
	AuthCallback: { code?: string }; // Thêm AuthCallback để xử lý deep link
};

const Stack = createStackNavigator<RootStackParamList>();

// Cấu hình deep linking
const linking = {
	prefixes: ["sell-milk-tea://"], // Scheme của ứng dụng
	config: {
		screens: {
			Introduce: "introduce",
			Signup: "signup",
			Login: "login",
			VerificationCode: "verification",
			// HomeScreen: "home",
			AuthCallback: "auth-callback", // Route cho callback từ Supabase
		},
	},
};

const Router = () => {
	return (
		<NavigationContainer linking={linking}>
			<Stack.Navigator
				initialRouteName="Introduce"
				screenOptions={{ headerShown: false }} // Ẩn header mặc định
			>
				<Stack.Screen name="Introduce" component={Introduce} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="VerificationCode" component={VerificationCode} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
