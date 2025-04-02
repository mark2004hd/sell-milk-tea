import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
// Đảm bảo đường dẫn đúng
import Router from "./src/assets/router/router";
import VerificationCode from "./src/assets/screens/VerificationCode";

const Stack = createStackNavigator();

export default function App() {
	return <Router/>;
}
