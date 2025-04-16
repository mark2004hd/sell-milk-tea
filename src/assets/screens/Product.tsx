import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePromotions } from "../context/PromotionsContext";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Font scaling function
const scaleFont = (size: number) => {
  return size * (width / 375); // Base width: 375 (iPhone 8)
};

// Responsive dimension function
const scaleDimension = (size: number) => {
  return size * (width / 375);
};

type RootStackParamList = {
  Home: undefined;
  Search: { promotions: Promotion[] };
  Product: { productId: string };
  Cart: undefined;
  CartScreen: undefined; // Add CartScreen to the type definition
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Product">;
type RouteProp = ReturnType<typeof useRoute>;

interface Promotion {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  tag?: string;
  tagColor?: string;
  product?: string;
}

const Product = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const { productId } = route.params as { productId: string };
  const { promotions } = usePromotions();
  const { addToCart } = useCart();

  const product = promotions.find((item) => item.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    setIsModalVisible(true);
    console.log("Modal should be visible");
  }, []);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>
      </SafeAreaView>
    );
  }
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart({
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image: product.image,
        description: product.description,
        quantity: quantity,
      });
      console.log(`Added ${quantity} ${product.title} to cart`);
      navigation.navigate("CartScreen"); // Ensure CartScreen is defined in RootStackParamList
      navigation.navigate("CartScreen"); // Sửa từ "Cart" thành "CartScreen"
    } catch (error) {
      console.error("Failed to add to cart:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={scaleFont(24)}
            color="#333"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="bag-outline" size={scaleFont(24)} color="#333" />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropColor="#000"
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{product.title}</Text>
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={scaleFont(24)}
                color={isFavorite ? "#DC143C" : "#666"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingWrapper}>
              <Ionicons name="star" size={scaleFont(16)} color="#FFD700" />
              <Text style={styles.ratingText}> 4.6 (660 đánh giá)</Text>
            </View>
          </View>
          <Text style={styles.modalDescription}>{product.product}</Text>
          <Text style={styles.modalDescription}>{product.description}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Text style={styles.favoriteText}>
              Favorite
            </Text>
          </TouchableOpacity>
          <View style={styles.priceContainer}>
            <View style={styles.priceWrapper}>
              <Text style={styles.priceLabel}>Payment Amount:</Text>
              <Text style={styles.price}>
                {(Number(product.price) * quantity).toFixed(2)}USD
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.addToCartButton, isLoading && styles.disabledButton]}
            onPress={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="bag-outline" size={scaleFont(24)} color="#FFFFFF" />
                <Text style={styles.addToCartText}>Add to cart</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: "bold",
    color: "#333",
  },
  productImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingHorizontal: scaleDimension(20),
    paddingVertical: scaleDimension(15),
    borderTopLeftRadius: scaleDimension(20),
    borderTopRightRadius: scaleDimension(20),
    maxHeight: height * 0.7,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleDimension(10),
  },
  modalTitle: {
    fontSize: scaleFont(20),
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  modalDescription: {
    fontSize: scaleFont(14),
    color: "#666",
    marginBottom: scaleDimension(10),
    lineHeight: scaleFont(20),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleDimension(15),
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: scaleFont(14),
    color: "#666",
  },
  favoriteButton: {
    backgroundColor: "#AB9377",
    paddingVertical: scaleDimension(6),
    paddingHorizontal: scaleDimension(27),
    borderRadius: scaleDimension(20),
    alignItems: "center",
    marginBottom: scaleDimension(20),
    alignSelf: "flex-end",
    borderBottomWidth: 2,
    borderBottomColor: "#8B6F47",
    flexDirection: "row",
  },
  favoriteText: {
    fontSize: scaleFont(14),
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: scaleDimension(20),
  },
  priceWrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  priceLabel: {
    fontSize: scaleFont(16),
    fontWeight: "bold",
    color: "#333",
    marginBottom: scaleDimension(5),
  },
  price: {
    fontSize: scaleFont(24),
    fontWeight: "bold",
    color: "#FF6347",
    marginTop: scaleDimension(5),
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: scaleDimension(20),
    paddingHorizontal: scaleDimension(10),
  },
  quantityButton: {
    padding: scaleDimension(10),
  },
  quantityText: {
    fontSize: scaleFont(18),
    fontWeight: "bold",
    color: "#333",
  },
  quantity: {
    fontSize: scaleFont(16),
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: scaleDimension(15),
  },
  addToCartButton: {
    backgroundColor: "#AB9377",
    paddingVertical: scaleDimension(15),
    paddingHorizontal: scaleDimension(30),
    borderRadius: scaleDimension(27),
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  addToCartText: {
    fontSize: scaleFont(17),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: scaleDimension(5),
  },
  errorText: {
    fontSize: scaleFont(18),
    color: "#666",
    textAlign: "center",
    marginTop: scaleDimension(20),
  },
});

export default Product;