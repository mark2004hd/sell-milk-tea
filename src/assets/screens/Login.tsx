import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import loginStyle from "../style/styleLogin";
export default function Login() {
	const [username, setUsername] = useState("");
	const [Email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<SafeAreaView style={loginStyle.container}>
			
			<ScrollView style={loginStyle.scrollView}>
				<Text style={loginStyle.header}>Login</Text>
				<Text style={loginStyle.wellcome}>Welcome to Bee Coffee, create an account now!</Text>

				<Text style={loginStyle.Email}>Email</Text>
				<View style={loginStyle.contactEmail}>
					<Image
						style={loginStyle.Emailimg}
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/user.png",
						}}
						resizeMode={"contain"}
					/>
					<TextInput
						style={loginStyle.textInputEmail}
						placeholder={"Enter Email address or Username"}
						value={Email}
						onChangeText={setEmail}
					/>
				</View>
				<Text style={loginStyle.titlePassword}>Password</Text>
				<View style={loginStyle.ViewPassword}>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/password.png",
						}}
						resizeMode={"stretch"}
						style={loginStyle.passwordIGM1}
					/>
					<TextInput
						placeholder={"Enter password"}
						style={loginStyle.password}
						value={password}
						onChangeText={setPassword}
					/>
					<View style={loginStyle.eye}></View>
					<TouchableOpacity>
						<Image
							source={{
								uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/eye.png",
							}}
							resizeMode={"stretch"}
							style={loginStyle.eyeIMG}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={() => alert("Pressed!")} style={loginStyle.ClickLogin}>
					<Text style={loginStyle.textLogin}>Login</Text>
				</TouchableOpacity>
				<Text style={loginStyle.loginQickLy}>Singin</Text>
				<TouchableOpacity style={loginStyle.signinGG} onPress={() => alert("Pressed!")}>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/google.png",
						}}
						resizeMode={"stretch"}
						style={loginStyle.siginIMG}
					/>
					<Text style={loginStyle.textSigin}>{"Sign in with google"}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={loginStyle.siginTikTok} onPress={() => alert("Pressed!")}>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/facebook.png",
						}}
						resizeMode={"stretch"}
						style={loginStyle.sigintiktokIMG}
					/>
					<Text style={loginStyle.texttiktokSigin}>{"Sign in with  Tiktok"}</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
