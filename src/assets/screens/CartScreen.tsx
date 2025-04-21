import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useCart } from "../context/CartContext";

const { width, height } = Dimensions.get("window");

const scaleFont = (size: number) => {
  return size * (width / 375);
};

const scaleDimension = (size: number) => {
  return size * (width / 375);
};

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Product: { productId: string };
  Cart: undefined;
  CartScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Cart">;

const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // State to track selected items

  // Toggle selection of an item
  const toggleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Filter selected items for subtotal calculation
  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));

  // Calculate subtotal for selected items only
  const subtotal = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Count selected items by size for discount logic
  const countSizeSAndUp = selectedCartItems.filter((item) =>
    ["S", "M", "L"].includes(item.size)
  ).length;
  const countSizeMAndUp = selectedCartItems.filter((item) =>
    ["M", "L"].includes(item.size)
  ).length;
  const countSizeLAndUp = selectedCartItems.filter((item) =>
    ["L"].includes(item.size)
  ).length;

  // Determine discount
  let discountPercentage = 0;
  let discountReason = "";
  if (countSizeLAndUp >= 2) {
    discountPercentage = 11;
    discountReason = "11% off for 2 or more Size L items";
  } else if (countSizeSAndUp >= 3) {
    discountPercentage = 9;
    discountReason = "9% off for 3 or more items (Size S and up)";
  } else if (countSizeMAndUp >= 2) {
    discountPercentage = 7;
    discountReason = "7% off for 2 or more items (Size M and up)";
  }

  const discountAmount = (subtotal * discountPercentage) / 100;
  const discountedSubtotal = subtotal - discountAmount;

  const shippingFee = 0.0;
  const total = discountedSubtotal + shippingFee;

  const handleUpdateQuantity = async (id: string, delta: number) => {
    setLoadingItemId(id);
    try {
      updateQuantity(id, delta);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleRemoveFromCart = async (id: string) => {
    setLoadingItemId(id);
    try {
      removeFromCart(id);
      setSelectedItems(selectedItems.filter((selectedId) => selectedId !== id)); // Remove from selected items if deleted
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setLoadingItemId(null);
    }
  };

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
        <TouchableOpacity
          onPress={() => toggleItemSelection(item.id)}
          style={[
            styles.checkbox,
            selectedItems.includes(item.id) && styles.checkboxSelected, // Apply selected style dynamically
          ]}
        >
          {selectedItems.includes(item.id) && (
            <Ionicons name="checkmark" size={scaleFont(16)} color="#fff" /> // White checkmark
          )}
        </TouchableOpacity>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>
            {item.description} (Size: {item.size})
          </Text>
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
            <Text style={styles.itemPrice}>
              {(item.price * item.quantity).toFixed(2)} USD
            </Text>
          </View>
        </View>
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
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="bag-outline" size={scaleFont(24)} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
      />
      {selectedItems.length > 0 && (
        <>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{subtotal.toFixed(2)} USD</Text>
            </View>
            {discountPercentage > 0 && (
              <>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount ({discountPercentage}%)</Text>
                  <Text style={styles.summaryValue}>-{discountAmount.toFixed(2)} USD</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.discountReason}>{discountReason}</Text>
                </View>
              </>
            )}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Fee</Text>
              <Text style={styles.summaryValue}>{shippingFee.toFixed(2)} USD</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.totalValue}>{total.toFixed(2)} USD</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
          </TouchableOpacity>
        </>
      )}
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
    backgroundColor: "#fff",
  },
  checkbox: {
    width: scaleDimension(22),
    height: scaleDimension(22),
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: scaleDimension(6),
    marginRight: scaleDimension(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxSelected: {
    backgroundColor: "#28a745", // Green color when selected
    borderColor: "#28a745", // Match border to background for a seamless look
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
    fontSize: scaleFont(17),
    color: "#333",
  },
  summaryValue: {
    fontSize: scaleFont(17),
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: scaleFont(16),
    fontWeight: "bold",
    color: "#FF6347",
  },
  discountReason: {
    fontSize: scaleFont(12),
    color: "#FF6347",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: scaleDimension(2),
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