import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import gif1 from "../style/gif1style";
const Stack = createStackNavigator();
const Gif = () => {
	return (
		<SafeAreaView style={gif1.container}>
			<StatusBar hidden={true} />

			<TouchableOpacity>
				<View>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/gif1.png",
						}}
						style={gif1.img}
					/>
				</View>
			</TouchableOpacity>
			<View style={gif1.sum}>
				<Text style={gif1.title1}>Interactive Activity </Text>
				<Text style={gif1.title2}>To Receive Gifts </Text>
			</View>

			<View style={gif1.sum}>
				<Text style={gif1.Text1}>Participate in Mitangren Coffee's interactive </Text>
				<Text style={gif1.Text3}>activities and win attractive gifts.</Text>
				<Text style={gif1.Text2}>Exciting activities are waiting for you to challenge!</Text>
			</View>
		</SafeAreaView>
	);
};

export default Gif;
