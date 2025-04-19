import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Animated,
  Easing,
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
  const baseWidth = 375;
  const scale = Math.min(width / baseWidth, 1.5);
  return size * scale;
};

// Responsive dimension function
const scaleDimension = (size: number) => {
  const baseWidth = 375;
  const scale = Math.min(width / baseWidth, 1.5);
  return size * scale;
};

// Responsive height function
const scaleHeight = (size: number) => {
  const baseHeight = 667;
  const scale = Math.min(height / baseHeight, 1.5);
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
  const { cartItems, addToCart } = useCart();

  const product = promotions.find((item) => item.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [animXValue, setAnimXValue] = useState(0); // Track flyAnimX value
  const [animYValue, setAnimYValue] = useState(0); // Track flyAnimY value

  // Animation refs
  const slideAnim = useRef(new Animated.Value(height)).current;
  const flyAnimX = useRef(new Animated.Value(0)).current;
  const flyAnimY = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1.5)).current; // Start at 1.5x
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const cartGrowAnim = useRef(new Animated.Value(1)).current; // For cart grow effect

  // Refs for measuring positions
  const cartIconRef = useRef<View>(null);
  const addToCartButtonRef = useRef<View>(null);
  const [cartIconPosition, setCartIconPosition] = useState({ x: 0, y: 0 });
  const [addToCartButtonPosition, setAddToCartButtonPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (isFocused) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused, slideAnim]);

  // Measure cart icon and add to cart button positions with retries
  useEffect(() => {
    let retries = 0;
    const maxRetries = 5; // Số lần thử tối đa
    const retryDelay = 100; // Delay giữa các lần thử (ms)

    const measurePositions = () => {
      let cartMeasured = false;
      let buttonMeasured = false;

      cartIconRef.current?.measure((x, y, w, h, pageX, pageY) => {
        const newPosition = { x: pageX + w / 2, y: pageY + h / 2 };
        setCartIconPosition(newPosition);
        cartMeasured = true;
        console.log("Cart Icon Position:", newPosition);
      });

      addToCartButtonRef.current?.measure((x, y, w, h, pageX, pageY) => {
        const newPosition = { x: pageX + w / 2, y: pageY + h / 2 };
        setAddToCartButtonPosition(newPosition);
        buttonMeasured = true;
        console.log("Add to Cart Button Position:", newPosition);
      });

      // Nếu chưa đo được cả hai vị trí, thử lại
      if (!cartMeasured || !buttonMeasured) {
        if (retries < maxRetries) {
          retries++;
          setTimeout(measurePositions, retryDelay);
        } else {
          console.warn("Failed to measure positions after max retries");
        }
      }
    };

    // Bắt đầu đo sau khi layout hoàn tất
    const timer = setTimeout(measurePositions, 100);
    return () => clearTimeout(timer);
  }, []); // Chỉ chạy một lần khi mount

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    // Kiểm tra xem vị trí đã được đo chưa
    if (
      cartIconPosition.x === 0 ||
      cartIconPosition.y === 0 ||
      addToCartButtonPosition.x === 0 ||
      addToCartButtonPosition.y === 0
    ) {
      console.warn("Positions not ready, retrying measurement...");
      // Thử đo lại vị trí
      cartIconRef.current?.measure((x, y, w, h, pageX, pageY) => {
        setCartIconPosition({ x: pageX + w / 2, y: pageY + h / 2 });
      });
      addToCartButtonRef.current?.measure((x, y, w, h, pageX, pageY) => {
        setAddToCartButtonPosition({ x: pageX + w / 2, y: pageY + h / 2 });
      });
      Alert.alert("Lỗi", "Vui lòng thử lại sau giây lát.");
      return; // Thoát nếu vị trí chưa sẵn sàng
    }

    try {
      addToCart({
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image: product.image,
        description: product.description,
        quantity: quantity,
      });
      console.log(`Added ${quantity} ${product.title} to cart`);

      // Set up listeners to track animation values
      flyAnimX.addListener(({ value }) => setAnimXValue(value));
      flyAnimY.addListener(({ value }) => setAnimYValue(value));

      // Trigger flying animation and cart grow
      setShowFlyingImage(true);
      Animated.parallel([
        Animated.timing(flyAnimX, {
          toValue: cartIconPosition.x - addToCartButtonPosition.x + scaleDimension(10),
          duration: 3000, // Set to 3 seconds
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(flyAnimY, {
            toValue: cartIconPosition.y - addToCartButtonPosition.y - scaleDimension(50),
            duration: 1500, // Set to 1.5 seconds
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
          }),
          Animated.timing(flyAnimY, {
            toValue: cartIconPosition.y - addToCartButtonPosition.y + scaleDimension(5),
            duration: 1500, // Set to 1.5 seconds
            easing: Easing.in(Easing.exp),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(scaleAnim, {
          toValue: 0.5, // Shrink to 0.5x
          duration: 3000, // Set to 3 seconds
          easing: Easing.linear, // Smooth linear scaling
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 3000, // Set to 3 seconds
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(cartGrowAnim, {
          toValue: 1.5, // Grow cart icon to 1.5x
          duration: 3000, // Set to 3 seconds
          easing: Easing.linear, // Smooth linear scaling
          useNativeDriver: true,
        }),
      ]).start(() => {
        console.log("Final Animation Position:", {
          x: animXValue,
          y: animYValue,
          cartIcon: cartIconPosition,
        });
        setShowFlyingImage(false);
        // Remove listeners
        flyAnimX.removeAllListeners();
        flyAnimY.removeAllListeners();
        // Reset animation values
        flyAnimX.setValue(0);
        flyAnimY.setValue(0);
        scaleAnim.setValue(1.5); // Reset to initial large scale
        opacityAnim.setValue(1);
        cartGrowAnim.setValue(1); // Reset cart icon to original size
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
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
        <TouchableOpacity
          onPress={() => navigation.navigate("CartScreen")}
          ref={cartIconRef}
          style={styles.cartIconContainer}
        >
          <Animated.View
            style={{
              transform: [{ scale: cartGrowAnim }],
            }}
          >
            <Ionicons name="bag-outline" size={scaleFont(24)} color="#FFFFFF" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
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
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          ref={addToCartButtonRef}
        >
          <Ionicons name="bag-outline" size={scaleFont(24)} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Flying Image Animation */}
      {showFlyingImage && (
        <Animated.View
          style={[
            styles.flyingImageContainer,
            {
              transform: [
                { translateX: flyAnimX },
                { translateY: flyAnimY },
                { scale: scaleAnim },
              ],
              opacity: opacityAnim,
              left: addToCartButtonPosition.x - scaleDimension(20),
              top: addToCartButtonPosition.y - scaleDimension(20),
            },
          ]}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.flyingImage}
            resizeMode="contain"
          />
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
    paddingVertical: scaleDimension(20),
    paddingTop: scaleHeight(40),
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
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -scaleDimension(5),
    right: -scaleDimension(5),
    backgroundColor: "#FF0000",
    borderRadius: scaleDimension(10),
    width: scaleDimension(18),
    height: scaleDimension(18),
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: scaleFont(10),
    fontWeight: "bold",
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
    maxHeight: height * 0.6,
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
  flyingImageContainer: {
    position: "absolute",
    width: scaleDimension(40),
    height: scaleDimension(40),
    zIndex: 100,
  },
  flyingImage: {
    width: "100%",
    height: "100%",
  },
});

export default Product;