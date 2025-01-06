import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, } from "react-native";
export default function VerificationCode() {
	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView  
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
				}}>
				<View 
					style={{
						backgroundColor: "#FFFFFF",
						paddingTop: 60,
						paddingBottom: 10,
						marginBottom: 30,
					}}>
					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 24,
							marginHorizontal: 24,
						}}>
						<Image
							source = {{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7e43032a-3f68-4675-a6d8-be1c10ad8e2f"}} 
							resizeMode = {"stretch"}
							style={{
								width: 22,
								height: 22,
								marginRight: 101,
							}}
						/>
						<Text 
							style={{
								color: "#191D31",
								fontSize: 16,
								fontWeight: "bold",
								flex: 1,
							}}>
							{"Verification"}
						</Text>
					</View>
					<View 
						style={{
							height: 1,
							backgroundColor: "#F3F3F3",
						}}>
					</View>
				</View>
				<Image
					source = {{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f5150111-9657-42a6-875e-eca8416e2b21"}} 
					resizeMode = {"stretch"}
					style={{
						height: 130,
						marginBottom: 44,
						marginHorizontal: 122,
					}}
				/>
				<Text 
					style={{
						color: "#191D31",
						fontSize: 22,
						fontWeight: "bold",
						marginBottom: 16,
						marginHorizontal: 100,
					}}>
					{"Verification code"}
				</Text>
				<Text 
					style={{
						color: "#A7AEC1",
						fontSize: 14,
						textAlign: "center",
						marginBottom: 5,
						marginHorizontal: 44,
					}}>
					{"We sent the information and verification code\n to someone's specified email address\nhaiwanzhajiangmian@mianmain.com "}
				</Text>
				<View 
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 50,
						marginHorizontal: 25,
					}}>
					<TouchableOpacity 
						style={{
							width: 60,
							alignItems: "center",
							backgroundColor: "#FFFFFF",
							borderColor: "#F3F3F3",
							borderRadius: 15,
							borderWidth: 1,
							paddingVertical: 27,
						}} onPress={()=>alert('Pressed!')}>
						<Text 
							style={{
								color: "#191D31",
								fontSize: 24,
								fontWeight: "bold",
							}}>
							{"6"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={{
							width: 60,
							alignItems: "center",
							backgroundColor: "#FFFFFF",
							borderColor: "#F3F3F3",
							borderRadius: 15,
							borderWidth: 1,
							paddingVertical: 27,
						}} onPress={()=>alert('Pressed!')}>
						<Text 
							style={{
								color: "#191D31",
								fontSize: 24,
								fontWeight: "bold",
							}}>
							{"5"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={{
							width: 60,
							alignItems: "center",
							backgroundColor: "#FFFFFF",
							borderColor: "#F3F3F3",
							borderRadius: 15,
							borderWidth: 1,
							paddingVertical: 27,
						}} onPress={()=>alert('Pressed!')}>
						<Text 
							style={{
								color: "#191D31",
								fontSize: 24,
								fontWeight: "bold",
							}}>
							{"5"}
						</Text>
					</TouchableOpacity>
					<View 
						style={{
							width: 60,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#FFFFFF",
							borderColor: "#AA9377",
							borderRadius: 15,
							borderWidth: 1,
							paddingVertical: 25,
						}}>
						<Text 
							style={{
								color: "#191D31",
								fontSize: 24,
								fontWeight: "bold",
								marginRight: 5,
							}}>
							{"8"}
						</Text>
						<View 
							style={{
								width: 1,
								height: 20,
								backgroundColor: "#2BACBE",
							}}>
						</View>
					</View>
					<View 
						style={{
							width: 60,
							height: 70,
							backgroundColor: "#FBFBFD",
							borderColor: "#F9F9F9",
							borderRadius: 15,
							borderWidth: 1,
						}}>
					</View>
				</View>
				<TouchableOpacity 
					style={{
						alignItems: "center",
						backgroundColor: "#77634C",
						borderRadius: 30,
						paddingVertical: 22,
						marginBottom: 24,
						marginHorizontal: 24,
					}} onPress={()=>alert('Pressed!')}>
					<Text 
						style={{
							color: "#FFFFFF",
							fontSize: 16,
							fontWeight: "bold",
						}}>
						{"Confirm"}
					</Text>
				</TouchableOpacity>
				<Text 
					style={{
						color: "#A7AEC1",
						fontSize: 14,
						marginBottom: 165,
						marginHorizontal: 50,
					}}>
					{"Can't receive the authentication code? Retry"}
				</Text>
				<View 
					style={{
						height: 5,
						backgroundColor: "#191D31",
						borderRadius: 100,
						marginHorizontal: 120,
					}}>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}