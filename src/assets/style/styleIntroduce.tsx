import { Dimensions, StyleSheet } from "react-native";

// Lấy kích thước màn hình
const { width, height } = Dimensions.get("window");

// Hàm tính toán tỷ lệ dựa trên chiều rộng màn hình
const scale = (size: number) => (width / 375) * size; // 375 là chiều rộng chuẩn (iPhone 11)

const styleIntroduce = StyleSheet.create({
	container: {
		flex: 1, // Chiếm toàn bộ không gian màn hình
		backgroundColor: "#ab9377",
		justifyContent: "center",
		alignItems: "center",
	},

	img: {
		width: scale(327), // Tỷ lệ dựa trên chiều rộng màn hình
		height: height * 0.5, // Chiều cao chiếm 50% màn hình
		marginLeft: scale(5), // Khoảng cách trái tỷ lệ
		resizeMode: "contain",
		marginTop: "17%", // Giữ nguyên phần trăm
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
	},

	Header: {
		paddingTop: scale(50), // Khoảng cách trên tỷ lệ
		fontSize: scale(40), // Kích thước chữ tỷ lệ
		fontWeight: "bold",
		color: "#fff",
		marginLeft: "22%", // Giữ nguyên phần trăm
		marginBottom: "4%", // Giữ nguyên phần trăm
	},

	Text1: {
		color: "#594329",
		fontSize: scale(16), // Kích thước chữ tỷ lệ
		marginLeft: "35%", // Giữ nguyên phần trăm
	},

	coffe: {
		borderRadius: 22,
		backgroundColor: "#77644c",
		width: scale(44), // Kích thước tỷ lệ
		height: scale(44), // Kích thước tỷ lệ
		marginHorizontal: width * 0.475, // Khoảng cách ngang tỷ lệ (gần giữa màn hình)
		marginTop: scale(30), // Khoảng cách trên tỷ lệ
		justifyContent: "center",
		alignItems: "center",
	},

	coffeIMG: {
		width: scale(27), // Kích thước tỷ lệ
		height: scale(27), // Kích thước tỷ lệ
	},

	version: {
		fontSize: scale(14), // Kích thước chữ tỷ lệ
		fontFamily: "Medium",
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginTop: scale(20), // Thêm khoảng cách trên để không bị sát đáy
	},
});

export default styleIntroduce;
