import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Profile from "./Profile";

// Component Header
const Header = () => {
	const [isSearchVisible, setIsSearchVisible] = useState(false); // State cho thanh tìm kiếm
	const [isNotificationVisible, setIsNotificationVisible] = useState(false); // State cho danh sách thông báo

	// Dữ liệu giả lập cho danh sách thông báo
	const notifications = [
		{ id: "1", message: "You have a new order!" },
		{ id: "2", message: "Your milk tea is ready!" },
		{ id: "3", message: "New promotion available!" },
	];

	// Hàm xử lý khi nhấn vào biểu tượng tìm kiếm
	const handleSearchPress = () => {
		setIsSearchVisible(true);
	};

	// Hàm xử lý khi nhấn vào biểu tượng thông báo
	const handleNotificationPress = () => {
		setIsNotificationVisible(true); // Hiển thị danh sách thông báo
	};

	return (
		<View style={headerstyle.headerView}>
			{/* Modal hiển thị danh sách thông báo */}
			<Modal
				visible={isNotificationVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setIsNotificationVisible(false)}>
				<View style={headerstyle.modalContainer}>
					<View style={headerstyle.modalContent}>
						<Text style={headerstyle.modalTitle}>Notifications</Text>
						<FlatList
							data={notifications}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<Text style={headerstyle.notificationItem}>
									{item.message}
								</Text>
							)}
						/>
						<Pressable
							onPress={() => setIsNotificationVisible(false)}
							style={headerstyle.closeButton}>
							<Text style={headerstyle.closeButtonText}>Close</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{/* Nếu thanh tìm kiếm đang hiển thị, thay thế header bằng TextInput */}
			{isSearchVisible ? (
				<TextInput
					style={headerstyle.searchInput}
					placeholder="Search..."
					autoFocus
					onBlur={() => setIsSearchVisible(false)}
				/>
			) : (
				<>
					{/* Phần bên trái: Profile và thông tin người dùng */}
					<View style={headerstyle.leftContainer}>
						<Profile />
						<View style={headerstyle.textContainer}>
							<Text style={headerstyle.nameText}>Mian Da Da</Text>
							<Text style={headerstyle.descriptionText}>
								The Young Milk Tea Lady Just Starting Out
							</Text>
						</View>
					</View>

					{/* Phần bên phải: Biểu tượng tìm kiếm và chuông */}
					<View style={headerstyle.rightContainer}>
						{/* Biểu tượng tìm kiếm với Pressable */}
						<Pressable
							onPress={handleSearchPress}
							style={({ pressed }) => [
								headerstyle.icon,
								{ opacity: pressed ? 0.5 : 1 },
							]}>
							<Icon name="search" size={24} color="#000" />
						</Pressable>

						{/* Biểu tượng chuông với Pressable */}
						<Pressable
							onPress={handleNotificationPress}
							style={({ pressed }) => [
								headerstyle.notificationContainer,
								{ opacity: pressed ? 0.5 : 1 },
							]}>
							<Icon name="bell" size={24} color="#000" />
							<View style={headerstyle.badge} />
						</Pressable>
					</View>
				</>
			)}
		</View>
	);
};

// StyleSheet cho Header
export const headerstyle = StyleSheet.create({
	headerView: {
		padding: 10,
		marginHorizontal: "2%",
		marginVertical: "9%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	leftContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	textContainer: {
		marginLeft: 10,
	},
	nameText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	descriptionText: {
		color: "#8C8E98",
		fontSize: 10,
	},
	rightContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginRight: 15,
	},
	notificationContainer: {
		position: "relative",
	},
	badge: {
		position: "absolute",
		right: -5,
		top: -5,
		backgroundColor: "red",
		borderRadius: 10,
		width: 10,
		height: 10,
	},
	searchInput: {
		flex: 1,
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 10,
		backgroundColor: "#fff",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		maxHeight: "50%",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	notificationItem: {
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	closeButton: {
		marginTop: 10,
		padding: 10,
		backgroundColor: "#007AFF",
		borderRadius: 5,
		alignItems: "center",
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default Header;
