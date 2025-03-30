import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
// Đảm bảo đường dẫn đúng
import Router from "./src/assets/router/router";

const Stack = createStackNavigator();

export default function App() {
	return <Router />;
}
