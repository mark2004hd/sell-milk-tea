import { LOCAL_IPV4_ADDRESS } from "@env";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Promotion {
	id: string;
	title: string;
	price: string;
	image: string;
	description: string;
	tag:string;
	tagColor:string
}

const bannerImages = [
	"https://raw.githubusercontent.com/mark2004hd/img-api/master/img/tab.png",
	"https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome1.jpg",
	"https://raw.githubusercontent.com/mark2004hd/img-api/master/img/intro5.jpg",
	"https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome3.jpg",
	"https://raw.githubusercontent.com/mark2004hd/img-api/master/img/intro6.jpg",
];

// const promotions: Promotion[] = [
// 	{
// 		id: "1",
// 		title: "Caramel Matcha Latte",
// 		price: "3.45USD",
// 		description: "CONTAINS CAFFEINE|MINTY FRESH",
// 		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
// 	},
// 	{
// 		id: "2",
// 		title: "Strawberry Cheese",
// 		price: "2.15USD",
// 		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
// 		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
// 	},
// 	{
// 		id: "3",
// 		title: "Choco Mint Delight",
// 		price: "4.32USD",
// 		description: "RICH COCOA |COOLING MINT|SMOOTH TEXTURE",
// 		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
// 	},
// 	{
// 		id: "4",
// 		title: "Green Apple Mojito",
// 		price: "1.89USD",
// 		description: "REFRESHING | HINT OF LIME | FRUITY BURST",
// 		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
// 	},
// 	{
// 		id: "5",
// 		title: "Double Espresso Shot",
// 		price: "2.75USD",
// 		description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
// 		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
// 	},
// 	{
// 		id: "6",
// 		title: "Tropical Fruit Yogurt",
// 		price: "3.90USD",
// 		description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
// 		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
// 	},
// ];


const HomeScreen = () => {
	const [promotions, setPromotions] = useState<Promotion[]>([])
	const [currentBanner, setCurrentBanner] = useState(0);
	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		const fetchPromotions = async () => {
			try {
				const response = await fetch(`http://${LOCAL_IPV4_ADDRESS}/zen8labs-system/api/tea`, {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
				  });
				  
				 
				  console.log("Raw text:", response);
				  const text = await response.text();
				  console.log("Raw text:", text);
				
				  const data = JSON.parse(text); // ép parse JSON
				  console.log("Parsed JSON:", data);
				  
				  const formattedData: Promotion[] = data.map((item: any) => ({
					id: item.id?.toString() ?? Math.random().toString(),
					title: item.title ?? "No Title",
					price: item.price ? `${item.price} USD` : "0.00 USD",
					description: item.description ?? "No description",
					image: item.image ?? "https://via.placeholder.com/150",
					tag : item.tag,
					tagColor : item.tagColor
				  }));
				  
				  setPromotions(formattedData);
				  
			} catch (error) {
				console.error("Failed to fetch promotions:", error);
			}
		};

		fetchPromotions();
	}, []);


	useEffect(() => {
		const interval = setInterval(() => {
			const nextIndex = (currentBanner + 1) % bannerImages.length;
			setCurrentBanner(nextIndex);
			flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
		}, 3000);

		return () => clearInterval(interval);
	}, [currentBanner]);

	const renderPromotionItem = ({ item }: { item: Promotion }) => (
		<View style={styles.promotionCard}>
			<Image
				source={{ uri: item.image }}
				style={styles.promotionImage}
				onError={(error) => console.log("Image load error:", error.nativeEvent)}
			/>
			<Text style={styles.promotionTitle}>{item.title}</Text>
			<Text style={styles.promotionDescription}>{item.description}</Text>
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
				data={[{ key: "content" }]}
				renderItem={() => (
					<>
						{/* Banner Carousel */}
						<View>
							<FlatList
								ref={flatListRef}
								data={bannerImages}
								horizontal
								pagingEnabled
								scrollEnabled={true} // Enable swiping
								showsHorizontalScrollIndicator={false}
								keyExtractor={(item, index) => index.toString()}
								renderItem={renderBannerItem}
								snapToInterval={Dimensions.get("window").width - 32}
								snapToAlignment="center"
								onScroll={(event) => {
									const contentOffsetX =
										event.nativeEvent.contentOffset.x;
									const index = Math.round(
										contentOffsetX /
										(Dimensions.get("window")
											.width -
											32),
									);
									setCurrentBanner(index);
								}}
								onScrollToIndexFailed={(info) => {
									const wait = new Promise((resolve) =>
										setTimeout(resolve, 100),
									);
									wait.then(() => {
										flatListRef.current?.scrollToIndex({
											index: info.index,
											animated: true,
										});
									});
								}}
							/>
							<View style={styles.dotsContainer}>
								{[0, 1, 2].map((index) => (
									<View
										key={index}
										style={[
											styles.dot,
											{
												backgroundColor:
													currentBanner ===
														index
														? "#8B4513"
														: "#ccc",
											},
										]}
									/>
								))}
								<View
									style={[
										styles.dot,
										styles.halfDot,
										{
											backgroundColor:
												currentBanner >= 3
													? "#8B4513"
													: "#ccc",
										},
									]}
								/>
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
								numColumns={2}
								showsVerticalScrollIndicator={false}
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
		width: Dimensions.get("window").width - 32,
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
		textTransform: "uppercase",
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
	halfDot: {
		// Added for half dot
		width: 4,
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
		textTransform: "uppercase",
	},
	promotionList: {
		marginBottom: 10,
	},
	promotionCard: {
		flex: 1,
		margin: 5,
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		maxWidth: (Dimensions.get("window").width - 48) / 2,
	},
	promotionImage: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 3,
	},
	promotionTitle: {
		fontSize: 14,
		fontWeight: "bold",
		marginTop: 5,
		textAlign: "center",
		textTransform: "uppercase",
	},
	promotionPrice: {
		fontSize: 12,
		color: "#888",
		marginTop: 5,
	},
	promotionDescription: {
		fontSize: 12,
		color: "#555",
		marginTop: 5,
		textAlign: "center",
	},
	viewMoreButton: {
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	viewMoreText: {
		fontSize: 14,
		color: "#333",
		textTransform: "uppercase",
	},
});

export default HomeScreen;
