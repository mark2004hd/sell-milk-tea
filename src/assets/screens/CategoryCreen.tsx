
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CategoryItem {
	id: string;
	image: string; // Removed title
}

const categories: CategoryItem[] = [
	{
		id: "1",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/category1.png",
	},
	{
		id: "2",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome3.jpg",
	},
	{
		id: "3",
		image: "https://via.placeholder.com/300x150",
	},
	{
		id: "4",
		image: "https://via.placeholder.com/300x150",
	},
];

const Category = () => {
	const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
		<View style={styles.categoryCard}>
			<Image
				source={{ uri: item.image }}
				style={styles.categoryImage}
				onError={(error) => console.log("Image load error:", error.nativeEvent)}
			/>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={categories}
				renderItem={renderCategoryItem}
				keyExtractor={(item) => item.id}
				numColumns={1} // Single-column layout
				contentContainerStyle={styles.categoryList}
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
	categoryList: {
		padding: 16,
	},
	categoryCard: {
		flex: 1,
		marginBottom: 16,
		borderRadius: 10,
		overflow: "hidden",
		alignItems: "center",
	},
	categoryImage: {
		width: "100%",
		height: 150,
		borderRadius: 10,
		// Shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 1,
		// Shadow for Android
		elevation: 5,
	},
	categoryId: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#333",
		marginTop: 8,
		textAlign: "center",
	},
});

export default Category;