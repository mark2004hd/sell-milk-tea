import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import sigupStyle from "../style/signupStyle";
import { LOCAL_IPV4_ADDRESS, PORT } from "@env";
type RootStackParamList = {
	Signup: undefined;
	Login: undefined; // Added Login route
	VerificationCode: undefined; // Added VerificationCode route
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface LoginProps {
	navigation: LoginScreenNavigationProp;
}

export default function Signup({ navigation }: LoginProps) {
	const [username, setUsername] = useState("");
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [visibilityTimeout, setVisibilityTimeout] = useState<NodeJS.Timeout | null>(null); // Biến lưu timeout

	const togglePasswordVisibility = () => {
		// Nếu đã bật hiển thị, hủy timeout cũ trước
		if (visibilityTimeout) {
			clearTimeout(visibilityTimeout);
		}

		// Đảo trạng thái hiển thị mật khẩu
		setIsPasswordVisible(!isPasswordVisible);

		// Nếu bật lên, đặt hẹn giờ 3s để tắt lại
		if (!isPasswordVisible) {
			const timeout = setTimeout(() => {
				setIsPasswordVisible(false);
			}, 1500);
			setVisibilityTimeout(timeout);
		}
	};


	const handleSignup = async () => {
		if (!username || !email || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		try {
			
			const response = await fetch(`${LOCAL_IPV4_ADDRESS}:${PORT}/zen8labs-system/api/v1/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					email,
					password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				
				navigation.navigate("VerificationCode");
				
			} else {
				Alert.alert("Signup failed", data.message || "Unknown error");
			}
		} catch (error) {
			
			Alert.alert("Error", "Something went wrong.");
		}
	};
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
						placeholderTextColor={username ? "#000" : "#888"}
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
						value={email}
						onChangeText={setemail}
						placeholderTextColor={email ? "#000" : "#888"}
					/>
				</View>
				<Text style={sigupStyle.titlePassword}>Password</Text>
				<View style={sigupStyle.ViewPassword}>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/password.png",
						}}
						resizeMode={"stretch"}
						style={sigupStyle.passwordIGM1}
					/>
					<TextInput
						placeholder={"Enter password"}
						style={sigupStyle.password}
						value={password}
						onChangeText={setPassword}
						placeholderTextColor={password ? "#000" : "#888"}
						secureTextEntry={!isPasswordVisible}
					/>
					<View style={sigupStyle.eye}></View>
					<TouchableOpacity onPress={() => togglePasswordVisibility()}>
						<Image
							source={{
								uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/eye.png",
							}}
							resizeMode={"stretch"}
							style={sigupStyle.eyeIMG}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={handleSignup}
					style={sigupStyle.ClickSignup}>
					<Text style={sigupStyle.textSignup}>Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={sigupStyle.loginQickLy}>Login qickly</Text>
				</TouchableOpacity>
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
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/facebook.png",
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