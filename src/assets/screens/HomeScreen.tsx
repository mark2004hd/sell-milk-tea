import { useNavigation, useIsFocused } from "@react-navigation/native"; // Thêm useIsFocused
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

// Định nghĩa kiểu cho navigation
type RootStackParamList = {
  Home: undefined;
  Search: { promotions: Promotion[] };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

// Cập nhật interface Promotion để thêm tag và tagColor
interface Promotion {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  tag: string; // Thêm tag
  tagColor: string; // Thêm tagColor
}

const bannerImages = [
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/tab.png",
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome1.jpg",
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/intro5.jpg",
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome3.jpg",
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/intro6.jpg",
];

// Cập nhật dữ liệu promotions để thêm tag và tagColor
const promotions: Promotion[] = [
	{
	  id: "841230",
	  title: "Caramel Matcha",
	  price: "3.75USD",
	  description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "New",
	  tagColor: "#FF8C00"
	},
	{
	  id: "291384",
	  title: "Berry Bliss",
	  price: "2.50USD",
	  description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Hot",
	  tagColor: "#FF6347"
	},
	{
	  id: "108347",
	  title: "Tropical Yogurt",
	  price: "3.90USD",
	  description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Seasonal",
	  tagColor: "#32CD32"
	},
	{
	  id: "753920",
	  title: "Mocha Thunder",
	  price: "2.95USD",
	  description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Hot",
	  tagColor: "#FF6347"
	},
	{
	  id: "672839",
	  title: "Peach Tea",
	  price: "2.30USD",
	  description: "FRUITY & TANGY | SUMMER VIBES",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "New",
	  tagColor: "#FF8C00"
	},
	{
	  id: "945182",
	  title: "Lychee Fizz",
	  price: "3.10USD",
	  description: "REFRESHING | HINT OF LIME | FRUITY BURST",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Seasonal",
	  tagColor: "#32CD32"
	},
	{
	  id: "209384",
	  title: "Choco Mint",
	  price: "3.65USD",
	  description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Hot",
	  tagColor: "#FF6347"
	},
	{
	  id: "384720",
	  title: "Strawberry Cheese",
	  price: "2.45USD",
	  description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "New",
	  tagColor: "#FF8C00"
	},
	{
	  id: "583920",
	  title: "Matcha Smoothie",
	  price: "3.55USD",
	  description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Seasonal",
	  tagColor: "#32CD32"
	},
	{
	  id: "329847",
	  title: "Coconut Latte",
	  price: "3.20USD",
	  description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Hot",
	  tagColor: "#FF6347"
	},
	{
	  id: "483920",
	  title: "Green Apple Mojito",
	  price: "1.89USD",
	  description: "REFRESHING | HINT OF LIME | FRUITY BURST",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "New",
	  tagColor: "#FF8C00"
	},
	{
	  id: "823490",
	  title: "Vanilla Cloud",
	  price: "2.90USD",
	  description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Seasonal",
	  tagColor: "#32CD32"
	},
	{
	  id: "902384",
	  title: "Rose Latte",
	  price: "3.70USD",
	  description: "FRUITY & TANGY | SUMMER VIBES",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "New",
	  tagColor: "#FF8C00"
	},
	{
	  id: "120384",
	  title: "Banana Brew",
	  price: "2.85USD",
	  description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Hot",
	  tagColor: "#FF6347"
	},
	{
	  id: "674390",
	  title: "Pineapple Punch",
	  price: "3.25USD",
	  description: "FRUITY & TANGY | SUMMER VIBES",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Seasonal",
	  tagColor: "#32CD32"
	},
	{
	  id: "984312",
	  title: "Double Espresso",
	  price: "2.75USD",
	  description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Hot",
	  tagColor: "#FF6347"
	},
	{
	  id: "543209",
	  title: "Lavender Dream",
	  price: "3.60USD",
	  description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "New",
	  tagColor: "#FF8C00"
	},
	{
	  id: "832947",
	  title: "Oreo Milkshake",
	  price: "3.80USD",
	  description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Seasonal",
	  tagColor: "#32CD32"
	},
	{
	  id: "710293",
	  title: "Mango Tango",
	  price: "2.95USD",
	  description: "REFRESHING | HINT OF LIME | FRUITY BURST",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "Hot",
	  tagColor: "#FF6347"
	},
	{
	  id: "603948",
	  title: "Honey Lemon",
	  price: "3.45USD",
	  description: "FRUITY & TANGY | SUMMER VIBES",
	  image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
	  tag: "New",
	  tagColor: "#FF8C00"
	}
  ];
  

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused(); // Thêm hook để kiểm tra focus
  const [currentBanner, setCurrentBanner] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBanner + 1) % bannerImages.length;
      setCurrentBanner(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBanner]);

  useEffect(() => {
    const handleBackPress = () => {
      // Chỉ áp dụng logic BackHandler khi HomeScreen đang focus
      if (!isFocused) {
        return false; // Để hệ thống xử lý mặc định (quay lại trang trước nếu ở màn hình khác)
      }

      if (swipeCount === 0) {
        setSwipeCount(1);
        setTimeout(() => setSwipeCount(0), 2000);
        return true;
      } else if (swipeCount === 1) {
        setIsModalVisible(true);
        setSwipeCount(0);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => backHandler.remove();
  }, [swipeCount, isFocused]); // Thêm isFocused vào dependency array

  const handleExit = () => {
    setIsModalVisible(false);
    BackHandler.exitApp();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSwipeCount(0);
  };

  const renderPromotionItem = ({ item }: { item: Promotion }) => (
    <TouchableOpacity
      style={styles.promotionCard}
      onPress={() => console.log(`Pressed on ${item.title}`)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.promotionImage}
        onError={(error) => console.log("Image load error:", error.nativeEvent)}
      />
      <Text style={styles.promotionTitle}>{item.title}</Text>
      <Text style={styles.promotionDescription}>{item.description}</Text>
      <Text style={styles.promotionPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  const renderBannerItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.banner}
      onPress={() => setSwipeCount((prev) => prev + 1)}
    >
      <Image source={{ uri: item }} style={styles.bannerImage} />
      <Text style={styles.bannerText}></Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: "content" }]}
        renderItem={() => (
          <>
            <View>
              <FlatList
                ref={flatListRef}
                data={bannerImages}
                horizontal
                pagingEnabled
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderBannerItem}
                snapToInterval={Dimensions.get("window").width - 32}
                snapToAlignment="center"
                onScroll={(event) => {
                  const contentOffsetX = event.nativeEvent.contentOffset.x;
                  const index = Math.round(
                    contentOffsetX / (Dimensions.get("window").width - 32)
                  );
                  setCurrentBanner(index);
                }}
                onScrollToIndexFailed={(info) => {
                  const wait = new Promise((resolve) => setTimeout(resolve, 100));
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
                        backgroundColor: currentBanner === index ? "#8B4513" : "#ccc",
                      },
                    ]}
                  />
                ))}
                <View
                  style={[
                    styles.dot,
                    styles.halfDot,
                    {
                      backgroundColor: currentBanner >= 3 ? "#8B4513" : "#ccc",
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.promotionsContainer}>
              <View style={styles.promotionsHeader}>
                <Text style={styles.sectionTitle}>LATEST PROMOTIONS</Text>
                <TouchableOpacity style={styles.viewMoreButton}>
                  <Text style={styles.viewMoreText}>VIEW MORE</Text>
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
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={handleCancel}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thoát ứng dụng</Text>
          <Text style={styles.modalMessage}>Bạn có chắc chắn muốn thoát không?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
              <Text style={styles.buttonText}>Thoát</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Cập nhật styles để thêm tag
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  banner: {
    marginHorizontal: 16,
    marginTop: 30,
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
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  cancelButton: {
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  exitButton: {
    backgroundColor: "#8B4513",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  tagContainer: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;