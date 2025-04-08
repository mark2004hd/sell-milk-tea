import React from "react";
import { Text, View,ScrollView } from "react-native";
import { SafeAreaView, } from "react-native-safe-area-context";

import Headers from "../components/Header";
const HomeScreen = () => {
	return (
		<SafeAreaView>
			<ScrollView>
				<View>
					<Headers />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
