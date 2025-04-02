import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
	BackHandler,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Modal from "react-native-modal";
import signupStyle from "../style/signupStyle";
import loginStyle from "../style/styleLogin";

type RootStackParamList = {
	Introduce: undefined;
	Signup: undefined;
	Login: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface LoginProps {
	navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: LoginProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [backPressCount, setBackPressCount] = useState(0);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [visibilityTimeout, setVisibilityTimeout] = useState<NodeJS.Timeout | null>(null);
	const [username, setUsername] = useState("");
	const [password1, setPassword1] = useState("");
	useEffect(() => {
		const backAction = () => {
			// Chỉ áp dụng logic nếu đang ở màn hình Login
			const currentRoute = navigation.getState()?.routes[navigation.getState().index].name;
			if (currentRoute !== "Login") {
				return false; // Không can thiệp nếu không phải màn hình Login
			}

			if (backPressCount === 0) {
				setBackPressCount(1);
				setTimeout(() => {
					setBackPressCount(0);
				}, 2000);
				return true;
			} else if (backPressCount === 1) {
				setModalVisible(true);
				setBackPressCount(2);
				setTimeout(() => {
					setModalVisible(false);
					setBackPressCount(0);
				}, 3500);
				return true;
			} else if (backPressCount === 2) {
				BackHandler.exitApp();
				return true;
			}
			return false;
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

		// Dọn dẹp khi component unmount (rời khỏi màn hình Login)
		return () => backHandler.remove();
	}, [backPressCount, navigation]);

	const handleExit = () => {
		setModalVisible(false);
		BackHandler.exitApp();
	};

	const handleCancel = () => {
		setModalVisible(false);
		setBackPressCount(0);
	};
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
	return (
		<SafeAreaView style={loginStyle.container}>
			<ScrollView style={loginStyle.scrollView}>
				<Text style={loginStyle.header}>Login</Text>
				<Text style={loginStyle.wellcome}>Welcome to Bee Coffee, login to your account!</Text>
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
						value={email}
						onChangeText={setEmail}
						placeholderTextColor={username ? "#000" : "#888"}
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
						secureTextEntry={!isPasswordVisible} 
						placeholderTextColor={password? "#000" : "#888"}
					/>
					<TouchableOpacity onPress={togglePasswordVisibility}>
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
				<TouchableOpacity onPress={() => navigation.navigate("Signup")}>
					<Text style={signupStyle.loginQickLy}>Sign up</Text>
				</TouchableOpacity>
				<TouchableOpacity style={loginStyle.signinGG} onPress={() => alert("Pressed!")}>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/google.png",
						}}
						resizeMode={"stretch"}
						style={loginStyle.siginIMG}
					/>
					<Text style={loginStyle.textSigin}>{"Sign in with Google"}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={loginStyle.siginTikTok} onPress={() => alert("Pressed!")}>
					<Image
						source={{
							uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/facebook.png",
						}}
						resizeMode={"stretch"}
						style={loginStyle.sigintiktokIMG}
					/>
					<Text style={loginStyle.texttiktokSigin}>{"Sign in with TikTok"}</Text>
				</TouchableOpacity>
			</ScrollView>

			<Modal
				isVisible={isModalVisible}
				backdropOpacity={0.5}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				onBackdropPress={handleCancel}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Thoát ứng dụng</Text>
					<Text style={styles.modalMessage}>Bạn có chắc chắn muốn thoát không?</Text>
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
							<Text style={styles.buttonText}>Hủy</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleExit} style={styles.exitButton}>
							<Text style={styles.buttonText}>Thoát</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 15,
		alignItems: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	modalMessage: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
		color: "#666",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
	},
	cancelButton: {
		backgroundColor: "#888",
		padding: 10,
		borderRadius: 8,
		flex: 1,
		marginRight: 10,
		alignItems: "center",
	},
	exitButton: {
		backgroundColor: "#FF6347",
		padding: 10,
		borderRadius: 8,
		flex: 1,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
