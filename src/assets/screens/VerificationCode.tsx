import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import verificationCodeStyle from "../style/styleVerification";

// Định nghĩa danh sách tham số điều hướng
type RootStackParamList = {
	Signup: undefined;
	VerificationCode: undefined;
};

// Định nghĩa kiểu cho navigation prop
type VerificationCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, "VerificationCode">;

// Định nghĩa interface cho props
interface VerificationCodeProps {
	navigation: VerificationCodeScreenNavigationProp;
}

export default function VerificationCode({ navigation }: VerificationCodeProps) {
	return (
		<SafeAreaView style={verificationCodeStyle.safeArea}>
			<ScrollView style={verificationCodeStyle.scrollView}>
				<View style={verificationCodeStyle.headerContainer}>
					<View style={verificationCodeStyle.headerRow}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Icon name="arrow-left" size={20} color="#191D31" />
						</TouchableOpacity>
						<View style={{ flex: 1, alignItems: "center" }}>
							<Text style={verificationCodeStyle.headerText}>
								Verification
							</Text>
						</View>
					</View>
					{/* Đường kẻ ngang (divider) chỉ nên đặt ở đây, bên ngoài headerRow */}
					<View style={verificationCodeStyle.divider}></View>
				</View>

				<Image
					source={{
						uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/Illustration.png",
					}}
					resizeMode="stretch"
					style={verificationCodeStyle.verificationImage}
				/>

				<Text style={verificationCodeStyle.titleText}>Verification code</Text>

				<Text style={verificationCodeStyle.infoText}>
					We sent the information and verification code{"\n"}
					to someone's specified email address{"\n"}
				</Text>
				{/* Cập nhật email để giống với ảnh */}
				<Text style={verificationCodeStyle.mailText}>hawanzhjiangmian@mianmain.com</Text>
				<View style={verificationCodeStyle.codeContainer}>
					{/* Thêm giá trị mặc định "8" cho các ô nhập mã */}
					<View style={verificationCodeStyle.codeButton}>
						<TextInput
							style={verificationCodeStyle.codeText}
							value=""
							textAlign="center"
							keyboardType="numeric"
							maxLength={1}
						/>
					</View>
					<View style={verificationCodeStyle.codeButton}>
						<TextInput
							style={verificationCodeStyle.codeText}
							value=""
							textAlign="center"
							keyboardType="numeric"
							maxLength={1}
						/>
					</View>
					<View style={verificationCodeStyle.codeButton}>
						<TextInput
							style={verificationCodeStyle.codeText}
							value=""
							textAlign="center"
							keyboardType="numeric"
							maxLength={1}
						/>
					</View>
					<View style={verificationCodeStyle.codeButton}>
						<TextInput
							style={verificationCodeStyle.codeText}
							value=""
							textAlign="center"
							keyboardType="numeric"
							maxLength={1}
						/>
					</View>
					<View style={verificationCodeStyle.emptyCodeBox}>
						<TextInput
							style={verificationCodeStyle.codeText}
							value=""
							textAlign="center"
							keyboardType="numeric"
							maxLength={1}
						/>
					</View>
				</View>

				<TouchableOpacity
					style={verificationCodeStyle.confirmButton}
					onPress={() => alert("Pressed!")}>
					<Text style={verificationCodeStyle.confirmText}>Confirm</Text>
				</TouchableOpacity>
				<TouchableOpacity>
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<Text style={verificationCodeStyle.retryText}>
						Can't receive the authentication code?
					</Text>
					<Text style={verificationCodeStyle.retry}> Retry</Text>
				</View>
			</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
