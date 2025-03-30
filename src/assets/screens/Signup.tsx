import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import sigupStyle from "../style/signupStyle";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [Emailr, setEmailr] = useState("");
	const [password, setPassword] = useState("");
    
	return (
		<SafeAreaView style={sigupStyle.container}>
			<ScrollView style={sigupStyle.scrollView}>
				<Text style={sigupStyle.header}>Sign up</Text>
				<Text style={sigupStyle.wellcome}>Welcome to Bee Coffee, create an account now!</Text>
				<Text style={sigupStyle.userName}>Username</Text>
				<View style={sigupStyle.input}>
					<Image
						style={sigupStyle.userNameigm}
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/profile.png",
						}}
						resizeMode={"contain"}
					/>
					<TextInput
						style={sigupStyle.textInputUserName}
						placeholder={"Enter username"}
						value={username}
						onChangeText={setUsername}
					/>
				</View>
				<Text style={sigupStyle.Email}>Email</Text>
				<View style={sigupStyle.contactEmail}>
					<Image
						style={sigupStyle.Emailimg}
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/user.png",
						}}
						resizeMode={"contain"}
					/>
					<TextInput
						style={sigupStyle.textInputEmail}
						placeholder={"Enter Email address"}
						value={Emailr}
						onChangeText={setEmailr}
					/>
				</View>
				<Text style={sigupStyle.titlePassword}>Password</Text>
				<View style={sigupStyle.ViewPassword}>
					<Image
						source={{
							uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/41ce6311-7f9e-4301-98db-40bc5c636808",
						}}
						resizeMode={"stretch"}
						style={sigupStyle.passwordIGM1}
					/>
					<TextInput
						placeholder={"Enter password"}
						style={sigupStyle.password}
						value={password}
						onChangeText={setPassword}
					/>
					<View style={sigupStyle.eye}></View>
					<TouchableOpacity>
						<Image
							source={{
								uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/eye.png",
							}}
							resizeMode={"stretch"}
							style={sigupStyle.eyeIMG}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={() => alert("Pressed!")} style={sigupStyle.ClickSignup}>
					<Text style={sigupStyle.textSignup}>Sign up</Text>
				</TouchableOpacity>
				<Text style={sigupStyle.loginQickLy}>Login quickly</Text>
				<TouchableOpacity style={sigupStyle.signinGG} onPress={() => alert("Pressed!")}>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/google.png",
						}}
						resizeMode={"stretch"}
						style={sigupStyle.siginIMG}
					/>
					<Text style={sigupStyle.textSigin}>{"Sign in with google"}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={sigupStyle.siginTikTok} onPress={() => alert("Pressed!")}>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/facebook.png"

						}}
						resizeMode={"stretch"}
						style={sigupStyle.sigintiktokIMG}
					/>
					<Text style={sigupStyle.texttiktokSigin}>{"Sign in with  Tiktok"}</Text>
				</TouchableOpacity>
				<View
					style={{
						height: 5,
						backgroundColor: "#191D31",
						borderRadius: 100,
						marginHorizontal: 120,
						paddingHorizontal: 30,
						paddingBottom: 30,
					}}></View>
			</ScrollView>
		</SafeAreaView>
	);
}
