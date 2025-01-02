import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styleIntroduce from "../style/styleIntroduce";

const Introduce = () => {
	return (
		<SafeAreaView style={styleIntroduce.container}>
			<ScrollView>
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
						<Text style={styleIntroduce.Header}>Coffe Mitang</Text>
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
			</ScrollView>
		</SafeAreaView>
	);
};

export default Introduce;
