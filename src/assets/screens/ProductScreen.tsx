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
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const scaleFont = (size: number) => {
  const baseWidth = 375;
  const scale = Math.min(width / baseWidth, 1.5);
  return size * scale;
};

const scaleDimension = (size: number) => {
  const baseWidth = 375;
  const scale = Math.min(width / baseWidth, 1.5);
  return size * scale;
};

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
  Favorites: undefined;
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
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart, cartItems } = useCart();

  const product = promotions.find((item) => item.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [animXValue, setAnimXValue] = useState(0);
  const [animYValue, setAnimYValue] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L">("S");

  const [isFavorite, setIsFavorite] = useState(
    favorites.some((item) => item.id === productId && item.size === selectedSize)
  );

  const slideAnim = useRef(new Animated.Value(height)).current;
  const flyAnimX = useRef(new Animated.Value(0)).current;
  const flyAnimY = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1.5)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const cartGrowAnim = useRef(new Animated.Value(1)).current;

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

  useEffect(() => {
    let retries = 0;
    const maxRetries = 5;
    const retryDelay = 100;

    const measurePositions = () => {
      let cartMeasured = false;
      let buttonMeasured = false;

      cartIconRef.current?.measure((x, y, w, h, pageX, pageY) => {
        const newPosition = { x: pageX + w / 2, y: pageY + h / 2 };
        setCartIconPosition(newPosition);
        cartMeasured = true;
      });

      addToCartButtonRef.current?.measure((x, y, w, h, pageX, pageY) => {
        const newPosition = { x: pageX + w / 2, y: pageY + h / 2 };
        setAddToCartButtonPosition(newPosition);
        buttonMeasured = true;
      });

      if (!cartMeasured || !buttonMeasured) {
        if (retries < maxRetries) {
          retries++;
          setTimeout(measurePositions, retryDelay);
        } else {
          console.warn("Failed to measure positions after max retries");
        }
      }
    };

    const timer = setTimeout(measurePositions, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsFavorite(
      favorites.some((item) => item.id === productId && item.size === selectedSize)
    );
  }, [favorites, productId, selectedSize]);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const cleanText = (text?: string) => {
    if (!text) return "";
    return text.replace(/<[^>]+>/g, "");
  };

  const calculatePrice = () => {
    let price = Number(product.price);
    if (selectedSize === "M") {
      price *= 1.1;
    } else if (selectedSize === "L") {
      price *= 1.15;
    }
    return price * quantity;
  };

  const basePrice = () => {
    let price = Number(product.price);
    if (selectedSize === "M") {
      price *= 1.1;
    } else if (selectedSize === "L") {
      price *= 1.15;
    }
    return price;
  };

  const getDiscountSuggestion = () => {
    const countSizeSAndUp = cartItems.filter((item) =>
      ["S", "M", "L"].includes(item.size)
    ).length;
    const countSizeMAndUp = cartItems.filter((item) =>
      ["M", "L"].includes(item.size)
    ).length;
    const countSizeLAndUp = cartItems.filter((item) =>
      ["L"].includes(item.size)
    ).length;

    const newCountSizeSAndUp = countSizeSAndUp + quantity;
    const newCountSizeMAndUp =
      countSizeMAndUp + (["M", "L"].includes(selectedSize) ? quantity : 0);
    const newCountSizeLAndUp =
      countSizeLAndUp + (selectedSize === "L" ? quantity : 0);

    if (newCountSizeLAndUp >= 2) {
      return "Add this to cart to get 11% off (2 or more Size L items)!";
    } else if (newCountSizeSAndUp >= 3) {
      return "Add this to cart to get 9% off (3 or more items, Size S and up)!";
    } else if (newCountSizeMAndUp >= 2) {
      return "Add this to cart to get 7% off (2 or more items, Size M and up)!";
    } else if (newCountSizeLAndUp === 1 && selectedSize === "L") {
      return "Add one more Size L item to get 11% off!";
    } else if (newCountSizeSAndUp === 2) {
      return "Add one more item to get 9% off (3 or more items, Size S and up)!";
    } else if (newCountSizeMAndUp === 1 && ["M", "L"].includes(selectedSize)) {
      return "Add one more Size M or L item to get 7% off!";
    }
    return "";
  };

  const discountSuggestion = getDiscountSuggestion();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(product.id, selectedSize);
    } else {
      addToFavorites({
        id: product.id,
        title: product.title,
        price: basePrice(),
        image: product.image,
        description: product.description,
        size: selectedSize,
      });
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (
      cartIconPosition.x === 0 ||
      cartIconPosition.y === 0 ||
      addToCartButtonPosition.x === 0 ||
      addToCartButtonPosition.y === 0
    ) {
      console.warn("Positions not ready, retrying measurement...");
      cartIconRef.current?.measure((x, y, w, h, pageX, pageY) => {
        setCartIconPosition({ x: pageX + w / 2, y: pageY + h / 2 });
      });
      addToCartButtonRef.current?.measure((x, y, w, h, pageX, pageY) => {
        setAddToCartButtonPosition({ x: pageX + w / 2, y: pageY + h / 2 });
      });
      Alert.alert("Error", "Please try again after a moment.");
      return;
    }

    try {
      addToCart({
        id: product.id + selectedSize,
        title: cleanText(product.title),
        description: cleanText(product.description) || cleanText(product.product),
        price: basePrice(),
        quantity,
        image: product.image,
        size: selectedSize,
      });

      flyAnimX.addListener(({ value }) => setAnimXValue(value));
      flyAnimY.addListener(({ value }) => setAnimYValue(value));

      setShowFlyingImage(true);
      Animated.parallel([
        Animated.timing(flyAnimX, {
          toValue: cartIconPosition.x - addToCartButtonPosition.x + scaleDimension(10),
          duration: 3000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(flyAnimY, {
            toValue: cartIconPosition.y - addToCartButtonPosition.y - scaleDimension(50),
            duration: 1500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
          }),
          Animated.timing(flyAnimY, {
            toValue: cartIconPosition.y - addToCartButtonPosition.y + scaleDimension(5),
            duration: 1500,
            easing: Easing.in(Easing.exp),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 3000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(cartGrowAnim, {
          toValue: 1.5,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowFlyingImage(false);
        flyAnimX.removeAllListeners();
        flyAnimY.removeAllListeners();
        flyAnimX.setValue(0);
        flyAnimY.setValue(0);
        scaleAnim.setValue(1.5);
        opacityAnim.setValue(1);
        cartGrowAnim.setValue(1);

        navigation.navigate("CartScreen");
      });
    } catch (error) {
      Alert.alert("Error", "Unable to add product to cart. Please try again.");
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
          <Text style={styles.modalTitle}>{cleanText(product.title)}</Text>
          <TouchableOpacity onPress={handleFavoriteToggle}>
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
            <Text style={styles.ratingText}>4.6 (660 đánh giá)</Text>
          </View>
        </View>
        <Text style={styles.modalDescription}>{cleanText(product.product)}</Text>
        <Text style={styles.modalDescription}>{cleanText(product.description)}</Text>

        <View style={styles.sizeAndFavoriteContainer}>
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeLabel}>Size: </Text>
            <View style={styles.sizeButtons}>
              <TouchableOpacity
                style={[
                  styles.sizeButton,
                  selectedSize === "S" && styles.sizeButtonSelected,
                ]}
                onPress={() => setSelectedSize("S")}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === "S" && styles.sizeButtonTextSelected,
                  ]}
                >
                  S
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sizeButton,
                  selectedSize === "M" && styles.sizeButtonSelected,
                ]}
                onPress={() => setSelectedSize("M")}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === "M" && styles.sizeButtonTextSelected,
                  ]}
                >
                  M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sizeButton,
                  selectedSize === "L" && styles.sizeButtonSelected,
                ]}
                onPress={() => setSelectedSize("L")}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === "L" && styles.sizeButtonTextSelected,
                  ]}
                >
                  L
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
          >
            <Text style={styles.favoriteText}>Favorite</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceWrapper}>
            <Text style={styles.priceLabel}>Payment Amount:</Text>
            <Text style={styles.price}>{calculatePrice().toFixed(2)} USD</Text>
            {discountSuggestion ? (
              <Text style={styles.discountSuggestion}>{discountSuggestion}</Text>
            ) : null}
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.quantityButton}
              activeOpacity={0.7}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.quantityButton}
              activeOpacity={0.7}
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
    justifyContent: "center",
    alignItems: "center",
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
  sizeAndFavoriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleDimension(20),
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sizeLabel: {
    fontSize: scaleFont(14),
    fontWeight: "bold",
    color: "#333",
    marginRight: scaleDimension(10),
  },
  sizeButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  sizeButton: {
    paddingVertical: scaleDimension(6),
    paddingHorizontal: scaleDimension(12),
    borderRadius: scaleDimension(15),
    borderWidth: 1,
    borderColor: "#666",
    marginRight: scaleDimension(8),
  },
  sizeButtonSelected: {
    backgroundColor: "#AB9377",
    borderColor: "#AB9377",
  },
  sizeButtonText: {
    fontSize: scaleFont(12),
    color: "#666",
  },
  sizeButtonTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  favoriteButton: {
    backgroundColor: "#AB9377",
    paddingVertical: scaleDimension(6),
    paddingHorizontal: scaleDimension(27),
    borderRadius: scaleDimension(20),
    alignItems: "center",
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
    flex: 1,
    marginRight: scaleDimension(10),
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
  discountSuggestion: {
    fontSize: scaleFont(12),
    color: "#FF6347",
    fontStyle: "italic",
    marginTop: scaleDimension(5),
    flexWrap: "wrap",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: scaleDimension(100),
  },
  quantityButton: {
    width: scaleDimension(30),
    height: scaleDimension(30),
    borderRadius: scaleDimension(15),
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: scaleFont(20),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  quantity: {
    fontSize: scaleFont(16),
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: scaleDimension(15),
    textAlign: "center",
    minWidth: scaleDimension(20),
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
    color: "#FF0000",
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