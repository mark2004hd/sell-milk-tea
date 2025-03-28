import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import sigupStyle from "../style/signupStyle";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
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
							uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cf035ba1-ff42-4b59-bd27-c10d4188db2b",
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
				<Text style={sigupStyle.phoneNumber}>Email</Text>
				<View style={sigupStyle.contactPhoneNumber}>
					<Image
						style={sigupStyle.phoneNumberimg}
						source={{
							uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9d58d294-4015-42d9-8f0d-607f97afe9ba",
						}}
						resizeMode={"contain"}
					/>
					<TextInput
						style={sigupStyle.textInputPhoneNumber}
						placeholder={"Enter Email address"}
						value={phoneNumber}
						onChangeText={setPhoneNumber}
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
								uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4a8cb955-e39b-40e3-b6ce-a817a6ce6735",
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
							uri: "https://s3-alpha-sig.figma.com/img/aca9/017d/ccbdf4aad9a888a07bce42f5210b3a99?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sDRiQpl-dFVC0scKIXNQ5B5wcMErS8~SdvNIK1BxhBz-H2yus4nVhaC0E4EJkLGef4AxWI0zbAGuqAEc24Z2~rRRktMF~65ZV~nQUBZhovv~jULUSQNWVQRHVtZLoqmD-KLJrQyLx2A7usfJwN7OeHGLksAsVYBvZ~bpOv3O9lejjud45raAZVb2JtkbavMe~4pC1b0YwKjbEo9KV1-O9cRhLH0SZVH3VIkf97FNMYdIeT9enZad9LB8yJB7S5t71h71Woacw000U3jtmZnqisDWFcTc9nWXBb-umyPmCYe9bAVOdn2qIySgQfafbnC~f~ZVZyH59AXBS30gBWXLTw__",
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
