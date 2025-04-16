import React, { useState, useEffect, useRef } from "react";
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
  Animated,
} from "react-native";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePromotions } from "../context/PromotionsContext";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Font scaling function
const scaleFont = (size: number) => {
  const baseWidth = 375; // Base width: 375 (iPhone 8)
  const scale = Math.min(width / baseWidth, 1.5); // Giới hạn tỷ lệ phóng to trên màn hình lớn
  return size * scale;
};

// Responsive dimension function
const scaleDimension = (size: number) => {
  const baseWidth = 375; // Base width: 375 (iPhone 8)
  const scale = Math.min(width / baseWidth, 1.5); // Giới hạn tỷ lệ phóng to trên màn hình lớn
  return size * scale;
};

// Responsive height function
const scaleHeight = (size: number) => {
  const baseHeight = 667; // Base height: 667 (iPhone 8)
  const scale = Math.min(height / baseHeight, 1.5); // Giới hạn tỷ lệ phóng to trên màn hình lớn
  return size * scale;
};

type RootStackParamList = {
  Home: undefined;
  Search: { promotions: Promotion[] };
  Product: { productId: string };
  Cart: undefined;
  CartScreen: undefined;
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
  const isFocused = useIsFocused();
  const { productId } = route.params as { productId: string };
  const { promotions } = usePromotions();
  const { addToCart } = useCart();

  const product = promotions.find((item) => item.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [animationState, setAnimationState] = useState<"hidden" | "visible">("hidden");

  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (isFocused) {
      setIsVisible(true);
      if (animationState !== "visible") {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setAnimationState("visible");
        });
      }
    } else {
      setIsVisible(true);
    }
  }, [isFocused, animationState, slideAnim]);

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
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        setAnimationState("hidden");
        navigation.navigate("CartScreen");
      });
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
          <Ionicons name="chevron-back" size={scaleFont(24)} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="bag-outline" size={scaleFont(24)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {isVisible && (
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{product.title}</Text>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
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
            <Text style={styles.favoriteText}>Favorite</Text>
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
        </Animated.View>
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
    paddingHorizontal: scaleDimension(20),
    paddingVertical: scaleDimension(20), // Giảm padding trên màn hình nhỏ
    paddingTop: scaleHeight(40), // Đảm bảo header không bị che bởi notch hoặc status bar
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  productImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: scaleDimension(20),
    paddingVertical: scaleDimension(15),
    borderTopLeftRadius: scaleDimension(20),
    borderTopRightRadius: scaleDimension(20),
    maxHeight: height * 0.6, // Giảm chiều cao tối đa trên màn hình nhỏ
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