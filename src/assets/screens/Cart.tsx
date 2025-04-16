import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Font scaling function
const scaleFont = (size: number) => {
	return size * (width / 375);
};

// Responsive dimension function
const scaleDimension = (size: number) => {
	return size * (width / 375);
};

type RootStackParamList = {
	Home: undefined;
	Search: undefined;
	Product: { productId: string };
	Cart: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Cart">;

const CartScreen = () => {
	const navigation = useNavigation<NavigationProp>();
	const { cartItems, updateQuantity, removeFromCart } = useCart();
	const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

	// Calculate totals
	const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const shippingFee = 3.0;
	const total = subtotal + shippingFee;

	const handleUpdateQuantity = async (id: string, delta: number) => {
		setLoadingItemId(id);
		try {
			await updateQuantity(id, delta);
		} catch (error) {
			console.error("Failed to update quantity:", error);
		} finally {
			setLoadingItemId(null);
		}
	};

	const handleRemoveFromCart = async (id: string) => {
		setLoadingItemId(id);
		try {
			await removeFromCart(id);
		} catch (error) {
			console.error("Failed to remove item:", error);
		} finally {
			setLoadingItemId(null);
		}
	};

	// Render the delete action for swipe
	const renderRightActions = (itemId: string) => (
		<TouchableOpacity
			style={styles.deleteAction}
			onPress={() => handleRemoveFromCart(itemId)}
			disabled={loadingItemId === itemId}
		>
			{loadingItemId === itemId ? (
				<ActivityIndicator size="small" color="#fff" />
			) : (
				<Ionicons name="trash-outline" size={scaleFont(24)} color="#fff" />
			)}
		</TouchableOpacity>
	);

	const renderItem = ({ item }: { item: any }) => (
		<Swipeable
			renderRightActions={() => renderRightActions(item.id)}
			overshootRight={false}
		>
			<View style={styles.itemContainer}>
				<View style={styles.checkbox} />
				<Image source={{ uri: item.image }} style={styles.itemImage} />
				<View style={styles.itemDetails}>
					<Text style={styles.itemTitle}>{item.title}</Text>
					<Text style={styles.itemDescription}>{item.product || item.description}</Text>
					<View style={styles.quantityPriceContainer}>
						<View style={styles.quantityContainer}>
							<TouchableOpacity
								onPress={() => handleUpdateQuantity(item.id, -1)}
								style={styles.quantityButton}
								disabled={loadingItemId === item.id}
							>
								{loadingItemId === item.id ? (
									<ActivityIndicator size="small" color="#333" />
								) : (
									<Text style={styles.quantityText}>-</Text>
								)}
							</TouchableOpacity>
							<Text style={styles.quantity}>{item.quantity}</Text>
							<TouchableOpacity
								onPress={() => handleUpdateQuantity(item.id, 1)}
								style={styles.quantityButton}
								disabled={loadingItemId === item.id}
							>
								{loadingItemId === item.id ? (
									<ActivityIndicator size="small" color="#333" />
								) : (
									<Text style={styles.quantityText}>+</Text>
								)}
							</TouchableOpacity>
						</View>
						<Text style={styles.itemPrice}>¥{(item.price * item.quantity).toFixed(2)}</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => handleRemoveFromCart(item.id)}
					disabled={loadingItemId === item.id}
				>
					{loadingItemId === item.id ? (
						<ActivityIndicator size="small" color="#FF0000" />
					) : (
						<Ionicons name="trash-outline" size={scaleFont(20)} color="#FF0000" />
					)}
				</TouchableOpacity>
			</View>
		</Swipeable>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name="chevron-back" size={scaleFont(24)} color="#333" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Shopping Cart</Text>
				<TouchableOpacity>
					<Ionicons name="bag-outline" size={scaleFont(24)} color="#333" />
				</TouchableOpacity>
			</View>
			<FlatList
				data={cartItems}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
			/>
			<View style={styles.summaryContainer}>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Subtotal</Text>
					<Text style={styles.summaryValue}>¥{subtotal.toFixed(2)}</Text>
				</View>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Shipping Fee</Text>
					<Text style={styles.summaryValue}>¥{shippingFee.toFixed(2)}</Text>
				</View>
				<View style={styles.divider} />
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Total</Text>
					<Text style={styles.totalValue}>¥{total.toFixed(2)}</Text>
				</View>
			</View>
			<TouchableOpacity style={styles.confirmButton}>
				<Text style={styles.confirmButtonText}>Confirm Order</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: scaleDimension(15),
		paddingVertical: scaleDimension(10),
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	headerTitle: {
		fontSize: scaleFont(18),
		fontWeight: "bold",
		color: "#333",
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: scaleDimension(15),
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		backgroundColor: "#fff", // Ensure background is white for swipe contrast
	},
	checkbox: {
		width: scaleDimension(20),
		height: scaleDimension(20),
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		marginRight: scaleDimension(10),
	},
	itemImage: {
		width: scaleDimension(80),
		height: scaleDimension(80),
		borderRadius: scaleDimension(10),
		marginRight: scaleDimension(10),
	},
	itemDetails: {
		flex: 1,
	},
	itemTitle: {
		fontSize: scaleFont(16),
		fontWeight: "bold",
		color: "#333",
		marginBottom: scaleDimension(5),
	},
	itemDescription: {
		fontSize: scaleFont(12),
		color: "#666",
		marginBottom: scaleDimension(10),
	},
	quantityPriceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	quantityContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		borderRadius: scaleDimension(20),
		paddingHorizontal: scaleDimension(5),
	},
	quantityButton: {
		padding: scaleDimension(5),
	},
	quantityText: {
		fontSize: scaleFont(16),
		fontWeight: "bold",
		color: "#333",
	},
	quantity: {
		fontSize: scaleFont(14),
		fontWeight: "bold",
		color: "#333",
		marginHorizontal: scaleDimension(10),
	},
	itemPrice: {
		fontSize: scaleFont(16),
		fontWeight: "bold",
		color: "#FF6347",
	},
	summaryContainer: {
		padding: scaleDimension(15),
		borderTopWidth: 1,
		borderTopColor: "#eee",
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: scaleDimension(5),
	},
	summaryLabel: {
		fontSize: scaleFont(14),
		color: "#333",
	},
	summaryValue: {
		fontSize: scaleFont(14),
		fontWeight: "bold",
		color: "#333",
	},
	totalValue: {
		fontSize: scaleFont(16),
		fontWeight: "bold",
		color: "#FF6347",
	},
	divider: {
		height: 1,
		backgroundColor: "#eee",
		marginVertical: scaleDimension(10),
	},
	confirmButton: {
		backgroundColor: "#D2B48C",
		paddingVertical: scaleDimension(15),
		margin: scaleDimension(15),
		borderRadius: scaleDimension(10),
		alignItems: "center",
	},
	confirmButtonText: {
		fontSize: scaleFont(16),
		fontWeight: "bold",
		color: "#fff",
	},
	emptyText: {
		fontSize: scaleFont(16),
		color: "#666",
		textAlign: "center",
		marginTop: scaleDimension(20),
	},
	deleteAction: {
		backgroundColor: "#FF0000",
		justifyContent: "center",
		alignItems: "center",
		width: scaleDimension(70),
		height: "100%",
	},
});

export default CartScreen;