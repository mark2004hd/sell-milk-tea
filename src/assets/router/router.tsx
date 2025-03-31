import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Introduce from "../screens/Introduce";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import VerificationCode from "../screens/VerificationCode";
const Stack = createStackNavigator();

const Router = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Introduce"
				screenOptions={{ headerShown: false }} // Ẩn header mặc định nếu không cần
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
