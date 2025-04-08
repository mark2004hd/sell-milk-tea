import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const Profile = () => {
	return (
		<View style={ProfileStyle.container}>
			<Image
				source={{
					uri: "https://raw.githubusercontent.com/mark2004dev/img-api/master/img/meo.jpg",
				}}
				style={ProfileStyle.img}
			/>
		</View>
	);
};

export default Profile;
const { width, height } = Dimensions.get("window");
export const ProfileStyle = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	img: {
		width: width * 0.12, // 12% chiều rộng màn hình (khoảng 44px trên màn 375px)
		height: width * 0.12, // Giữ tỷ lệ 1:1
		borderWidth: 2, // Giữ nguyên vì border mỏng không cần scale quá nhiều
		borderColor: "#FFFFFF",
		// borderRadius bằng nửa width để giữ hình tròn
		borderRadius: (width * 0.12) / 2,
	},
});
