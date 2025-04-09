import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Promotion {
	id: string;
	title: string;
	price: string;
	image: string;
}

const bannerImages = [
	"https://github.com/mark2004hd/img-api/raw/master/img/tab.png",
	"https://github.com/mark2004hd/img-api/raw/master/img/introhome1.jpg",
	"https://github.com/mark2004hd/img-api/raw/master/img/introhome3.jpg",

	// Thêm ảnh khác nếu muốn
];

const promotions: Promotion[] = [
	{
		id: "1",
		title: "400 TIMES COCONUT LATTE CONTAINS COFFINE DAIRY",
		price: "2,75USD",
		image: "https://via.placeholder.com/150", // Thay bằng URL hình ảnh thực tế
	},
	{
		id: "2",
		title: "PREMIUM TARO PEACH GUM THICK PASTO RICE MOCHI",
		price: "1,92USD",
		image: "https://via.placeholder.com/150", // Thay bằng URL hình ảnh thực tế
	},
];

const HomeScreen = () => {
	const [currentBanner, setCurrentBanner] = useState(0);
	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			const nextIndex = (currentBanner + 1) % bannerImages.length;
			setCurrentBanner(nextIndex);
			flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
		}, 3000); // Mỗi 3 giây

		return () => clearInterval(interval); // Clear khi unmount
	}, [currentBanner]);

	const renderPromotionItem = ({ item }: { item: Promotion }) => (
		<View style={styles.promotionCard}>
			<Image source={{ uri: item.image }} style={styles.promotionImage} />
			<Text style={styles.promotionTitle}>{item.title}</Text>
			<Text style={styles.promotionPrice}>{item.price}</Text>
		</View>
	);

	const renderBannerItem = ({ item }: { item: string }) => (
		<View style={styles.banner}>
			<Image source={{ uri: item }} style={styles.bannerImage} />
			<Text style={styles.bannerText}></Text>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={[{ key: "content" }]} // Sử dụng FlatList để bọc toàn bộ nội dung
				renderItem={() => (
					<>
						{/* Banner Carousel */}
						<View>
							{/* Replace <Headers /> with the correct component or remove it */}
							{/* <CorrectComponent /> */}
							<FlatList
								ref={flatListRef}
								data={bannerImages}
								horizontal
								pagingEnabled
								scrollEnabled={false}
								showsHorizontalScrollIndicator={false}
								keyExtractor={(item, index) => index.toString()}
								renderItem={renderBannerItem}
								onScrollToIndexFailed={(info) => {
									const wait = new Promise((resolve) =>
										setTimeout(resolve, 500),
									);
									wait.then(() => {
										flatListRef.current?.scrollToIndex({
											index: info.index,
											animated: true,
										});
									});
								}}
							/>
							{/* Dots Indicator */}
							<View style={styles.dotsContainer}>
								{bannerImages.map((_, index) => (
									<View
										key={index}
										style={[
											styles.dot,
											{
												backgroundColor:
													index ===
													currentBanner
														? "#8B4513"
														: "#ccc",
											},
										]}
									/>
								))}
							</View>
						</View>

						{/* Latest Promotions */}
						<View style={styles.promotionsContainer}>
							<View style={styles.promotionsHeader}>
								<Text style={styles.sectionTitle}>
									LATEST PROMOTIONS
								</Text>
								<TouchableOpacity style={styles.viewMoreButton}>
									<Text style={styles.viewMoreText}>
										VIEW MORE
									</Text>
								</TouchableOpacity>
							</View>
							<FlatList
								data={promotions}
								renderItem={renderPromotionItem}
								keyExtractor={(item) => item.id}
								horizontal
								showsHorizontalScrollIndicator={false}
								style={styles.promotionList}
								nestedScrollEnabled={true}
								scrollEnabled={true}
							/>
						</View>
					</>
				)}
				keyExtractor={(item) => item.key}
				nestedScrollEnabled={true}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	banner: {
		marginHorizontal: 16,
		marginTop: 10,
		borderRadius: 10,
		overflow: "hidden",
		width: Dimensions.get("window").width - 32, // Chiều rộng bằng chiều rộng màn hình trừ margin
	},
	bannerImage: {
		width: "100%",
		height: 150,
	},
	bannerText: {
		position: "absolute",
		top: 20,
		left: 20,
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		textTransform: "uppercase", // In hoa
	},
	dotsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	promotionsContainer: {
		marginTop: 20,
		paddingHorizontal: 16,
	},
	promotionsHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textTransform: "uppercase", // In hoa
	},
	promotionList: {
		marginBottom: 10,
	},
	promotionCard: {
		marginRight: 10,
		width: 150,
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
	},
	promotionImage: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	promotionTitle: {
		fontSize: 14,
		fontWeight: "bold",
		marginTop: 5,
		textAlign: "center",
		textTransform: "uppercase", // In hoa
	},
	promotionPrice: {
		fontSize: 12,
		color: "#888",
		marginTop: 5,
	},
	viewMoreButton: {
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	viewMoreText: {
		fontSize: 14,
		color: "#333",
		textTransform: "uppercase", // In hoa
	},
});

export default HomeScreen;
