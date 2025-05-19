
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CategoryItem {
	id: string;
	image: string; // Removed title
}

const categories: CategoryItem[] = [
	{
		"id": "1",
		"image": "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/category1.png"
	},
	{
		"id": "2",
		"image": "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome3.jpg"
	},
	{
		"id": "3",
		"image": "https://fra.cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/682a0df60022134ab139/view?project=67ed5f5e00176f489872&mode=admin"
	},
	{
		"id": "4",
		"image": "https://fra.cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/682a0e30000781b19ff0/view?project=67ed5f5e00176f489872&mode=admin"
	},
	{
		"id": "5",
		"image": "https://fra.cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/682a0e4a003b0791cf47/view?project=67ed5f5e00176f489872&mode=admin"
	},
	{
		"id": "6",
		"image": "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome1.jpg"
	}
	
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