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
  TextInput,
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
  OrderSuccess: undefined;
  OrderHistory: undefined;
  EditAddress: { onSave: (address: string, phoneNumber: string) => void };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Cart">;

const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { cartItems, updateQuantity, removeFromCart, saveOrder } = useCart();

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const toggleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));

  const itemsBySize = selectedCartItems.reduce((acc: { [key: string]: { items: any[]; totalPrice: number } }, item) => {
    const size = item.size;
    if (!acc[size]) {
      acc[size] = { items: [], totalPrice: 0 };
    }
    acc[size].items.push(item);
    acc[size].totalPrice += item.price * item.quantity;
    return acc;
  }, {});

  let discountAmount = 0;
  let discountReasons: string[] = [];
  const discountPercentage = 15;

  Object.keys(itemsBySize).forEach((size) => {
    const sizeData = itemsBySize[size];
    const itemCount = sizeData.items.length;
    if (itemCount >= 2) {
      const discountForSize = (sizeData.totalPrice * discountPercentage) / 100;
      discountAmount += discountForSize;
      discountReasons.push(`${discountPercentage}% off for ${itemCount} items of Size ${size}`);
    }
  });

  const subtotal = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
      setSelectedItems(selectedItems.filter((selectedId) => selectedId !== id));
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleConfirmOrder = () => {
    if (address.trim() === '' || phoneNumber.trim() === '') {
      alert('Please fill in both address and phone number.');
      return;
    }

    setIsConfirming(true);

    setTimeout(() => {
      // Save the order to CartContext, including address and phoneNumber
      saveOrder({
        items: selectedCartItems,
        total: total,
        address: address,
        phoneNumber: phoneNumber,
      });

      selectedItems.forEach((id) => removeFromCart(id));
      setSelectedItems([]);
      setAddress('');
      setPhoneNumber('');

      setIsConfirming(false);
      navigation.navigate("OrderSuccess");
    }, 3000);
  };

  const handleEditAddress = () => {
    navigation.navigate('EditAddress', {
      onSave: (newAddress: string, newPhoneNumber: string) => {
        setAddress(newAddress);
        setPhoneNumber(newPhoneNumber);
      },
    });
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
            selectedItems.includes(item.id) && styles.checkboxSelected,
          ]}
        >
          {selectedItems.includes(item.id) && (
            <Ionicons name="checkmark" size={scaleFont(16)} color="#fff" />
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
        <TouchableOpacity onPress={() => navigation.navigate("OrderHistory")}>
          <Ionicons name="time-outline" size={scaleFont(24)} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.addressHeader}>
        <Text style={styles.addressHeaderText}>Select address</Text>
        <TouchableOpacity onPress={handleEditAddress}>
          <Text style={styles.editButtonText}>Edit</Text>
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
          {/* Address and Phone Number Input Section */}
      

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{subtotal.toFixed(2)} USD</Text>
            </View>
            {discountAmount > 0 && (
              <>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount</Text>
                  <Text style={styles.summaryValue}>-{discountAmount.toFixed(2)} USD</Text>
                </View>
                {discountReasons.map((reason, index) => (
                  <View key={index} style={styles.summaryRow}>
                    <Text style={styles.discountReason}>{reason}</Text>
                  </View>
                ))}
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
          <TouchableOpacity
            style={[styles.confirmButton, isConfirming && styles.confirmButtonDisabled]}
            onPress={handleConfirmOrder}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            )}
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
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleDimension(15),
    paddingVertical: scaleDimension(10),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  addressHeaderText: {
    fontSize: scaleFont(16),
    color: "#333",
  },
  editButtonText: {
    fontSize: scaleFont(16),
    color: "#666",
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
    backgroundColor: "#28a745",
    borderColor: "#28a745",
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
  addressInputContainer: {
    padding: scaleDimension(15),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inputLabel: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: scaleDimension(5),
  },
  input: {
    width: '100%',
    height: scaleDimension(40),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: scaleDimension(5),
    paddingHorizontal: scaleDimension(10),
    marginBottom: scaleDimension(15),
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
  confirmButtonDisabled: {
    backgroundColor: "#a68c6a",
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