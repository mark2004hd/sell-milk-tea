import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import verificationCodeStyle from "../style/styleVerification";

export default function VerificationCode() {
	return (
		<SafeAreaView style={verificationCodeStyle.safeArea}>
			<ScrollView style={verificationCodeStyle.scrollView}>
				<View style={verificationCodeStyle.headerContainer}>
					<View style={verificationCodeStyle.headerRow}>
						<View style={{ flex: 1, alignItems: "center", }}>
							<Text style={verificationCodeStyle.headerText}>
								Verification
							</Text>
						</View>
					</View>
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
				<Text style={verificationCodeStyle.mailText}>
					Please check your email for the verification code.
				</Text>
				<View style={verificationCodeStyle.codeContainer}>
					<View style={verificationCodeStyle.codeButton}>
						<TextInput style={verificationCodeStyle.codeText}></TextInput>
					</View>
					<View style={verificationCodeStyle.codeButton}>
						<TextInput style={verificationCodeStyle.codeText}></TextInput>
					</View>
					<View style={verificationCodeStyle.codeButton}>
						<TextInput style={verificationCodeStyle.codeText}></TextInput>
					</View>
					<View style={verificationCodeStyle.codeButton}>
						<TextInput style={verificationCodeStyle.codeText}></TextInput>
						{/* <View style={verificationCodeStyle.activeCodeDivider}></View> */}
					</View>
					<View style={verificationCodeStyle.emptyCodeBox}>
						<TextInput style={verificationCodeStyle.codeText}></TextInput>
					</View>
				</View>

				<TouchableOpacity
					style={verificationCodeStyle.confirmButton}
					onPress={() => alert("Pressed!")}>
					<Text style={verificationCodeStyle.confirmText}>Confirm</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<Text style={verificationCodeStyle.retryText}>
						Can't receive the authentication code?
					</Text>
					<Text style={verificationCodeStyle.retry}> Retry</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
