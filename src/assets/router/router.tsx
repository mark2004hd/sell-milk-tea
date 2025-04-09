import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Introduce from "../screens/Introduce";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import VerificationCode from "../screens/VerificationCode";
import MainTabs from "./MainTabs";

type RootStackParamList = {
	Introduce: undefined;
	Signup: undefined;
	Login: undefined;
	VerificationCode: undefined;
	MainTabs: undefined;
	AuthCallback: { code?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const linking = {
	prefixes: ["sell-milk-tea://"],
	config: {
		screens: {
			Introduce: "introduce",
			Signup: "signup",
			Login: "login",
			VerificationCode: "verification",
			MainTabs: "main",
			AuthCallback: "auth-callback",
		},
	},
};

const Router = () => {
	return (
		<NavigationContainer linking={linking}>
			<Stack.Navigator initialRouteName="Introduce" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Introduce" component={Introduce} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="VerificationCode" component={VerificationCode} />
				<Stack.Screen name="MainTabs" component={MainTabs} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
