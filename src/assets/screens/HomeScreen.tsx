import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Home: undefined;
  Search: { promotions: Promotion[] };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Promotion {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  tag?: string;
  tagColor?: string;
  product?: string;
}

const bannerImages = [
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/tab.png",
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome1.jpg",
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/intro5.jpg",
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/introhome3.jpg",
  "https://raw.githubusercontent.com/mark2004hd/img-api/master/img/intro6.jpg",
];

const promotions: Promotion[] = [
	{
		id: "1",
		title: "Caramel Matcha",
		price: "3.75USD",
		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
		product: "A sweet and creamy matcha drink topped with cheese foam. Perfect for a cozy afternoon.",
	},
	{
		id: "2",
		title: "Berry Bliss",
		price: "2.50USD",
		description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
		image: "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda4a0025f51ed3cf/view?project=67ed5f5e00176f489872&mode=admin",
		tag: "New",
		tagColor: "#FF8C00",
		product: "A refreshing berry-based drink with a smooth chocolate twist. Enjoy the best of both worlds.",
	},
	{
		id: "3",
		title: "Tropical Yogurt",
		price: "3.90USD",
		description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
		image: "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/1/view?project=67ed5f5e00176f489872&mode=admin",
		tag: "Seasonal",
		tagColor: "#32CD32",
		product: "A creamy yogurt blended with tropical fruits, perfect for a refreshing and cooling treat.",
	},
	{
		id: "4",
		title: "Mocha Thunder",
		price: "2.95USD",
		description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
		image: "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda8a0003883d0016/view?project=67ed5f5e00176f489872&mode=admin",
		tag: "Hot",
		tagColor: "#FF6347",
		product: "A bold mocha coffee with a thunderous caffeine kick. Perfect for those needing an energy boost.",
	},
	{
		id: "5",
		title: "Peach Tea",
		price: "2.30USD",
		description: "FRUITY & TANGY | SUMMER VIBES",
		image: "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda56000979606ad6/view?project=67ed5f5e00176f489872&mode=admin",
		tag: "New",
		tagColor: "#FF8C00",
		product: "A refreshing peach tea, tangy and light, perfect for a summer day.",
	},
	{
		id: "6",
		title: "Mocha Thunder",
		price: "2.95USD",
		description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
		product: "A strong mocha flavor with an intense caffeine punch. Ideal for mocha lovers.",
	},
	{
		id: "7",
		title: "Peach Tea",
		price: "2.30USD",
		description: "FRUITY & TANGY | SUMMER VIBES",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
		product: "A fruity peach tea with a tangy twist. Perfect for any time of the day.",
	},
	{
		id: "8",
		title: "Lychee Fizz",
		price: "3.10USD",
		description: "REFRESHING | HINT OF LIME | FRUITY BURST",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
		product: "A refreshing lychee drink with a hint of lime, bursting with fruity flavors.",
	},
	{
		id: "9",
		title: "Choco Mint",
		price: "3.65USD",
		description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
		product: "A cool and smooth chocolate drink with a refreshing minty twist.",
	},
	{
		id: "10",
		title: "Strawberry Cheese",
		price: "2.45USD",
		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
		product: "A sweet strawberry treat topped with creamy cheese foam.",
	},
	{
		id: "11",
		title: "Matcha Smoothie",
		price: "3.55USD",
		description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
		product: "A cool and smooth matcha smoothie for a delightful experience.",
	},
	{
		id: "12",
		title: "Coconut Latte",
		price: "3.20USD",
		description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
		product: "A rich coconut latte with a bold flavor and high caffeine content.",
	},
	{
		id: "13",
		title: "Green Apple Mojito",
		price: "1.89USD",
		description: "REFRESHING | HINT OF LIME | FRUITY BURST",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
		product: "A zesty green apple mojito with a hint of lime, perfect for a refreshing burst.",
	},
	{
		id: "14",
		title: "Vanilla Cloud",
		price: "2.90USD",
		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
		product: "A smooth and creamy vanilla drink topped with delicious cheese foam.",
	},
	{
		id: "15",
		title: "Rose Latte",
		price: "3.70USD",
		description: "FRUITY & TANGY | SUMMER VIBES",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
		product: "A fragrant rose latte with fruity and tangy notes for a refreshing twist.",
	},
	{
		id: "16",
		title: "Banana Brew",
		price: "2.85USD",
		description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
		product: "A tropical brew with creamy yogurt and mixed fruits for a chilled delight.",
	},
	{
		id: "17",
		title: "Pineapple Punch",
		price: "3.25USD",
		description: "FRUITY & TANGY | SUMMER VIBES",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
		product: "A tangy pineapple punch, perfect for a vibrant summer experience.",
	},
	{
		id: "18",
		title: "Double Espresso",
		price: "2.75USD",
		description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
		product: "A strong double espresso to keep you energized throughout the day.",
	},
	{
		id: "19",
		title: "Lavender Dream",
		price: "3.60USD",
		description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
		product: "A smooth lavender drink with a chocolatey touch for a dreamy experience.",
	},
	{
		id: "20",
		title: "Oreo Milkshake",
		price: "3.80USD",
		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
		product: "A sweet and creamy Oreo milkshake topped with a delightful cheese foam.",
	},
	{
		id: "21",
		title: "Mango Tango",
		price: "2.95USD",
		description: "REFRESHING | HINT OF LIME | FRUITY BURST",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
		product: "A refreshing mango drink with a hint of lime, perfect for a tropical burst.",
	},
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
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
      if (!isFocused) {
        return false;
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
  }, [swipeCount, isFocused]);

  const handleExit = () => {
    setIsModalVisible(false);
    BackHandler.exitApp();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSwipeCount(0);
  };

  const renderPromotionItem = ({ item }: { item: Promotion }) => (
    <TouchableOpacity style={styles.promotionCard} onPress={() => console.log(`Pressed on ${item.title}`)}>
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
    <TouchableOpacity style={styles.banner} onPress={() => setSwipeCount((prev) => prev + 1)}>
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
                  const index = Math.round(contentOffsetX / (Dimensions.get("window").width - 32));
                  setCurrentBanner(index);
                }}
                onScrollToIndexFailed={(info) => {
                  const wait = new Promise((resolve) => setTimeout(resolve, 100));
                  wait.then(() => {
                    flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                  });
                }}
              />
              <View style={styles.dotsContainer}>
                {[0, 1, 2].map((index) => (
                  <View
                    key={index}
                    style={[styles.dot, { backgroundColor: currentBanner === index ? "#8B4513" : "#ccc" }]}
                  />
                ))}
                <View
                  style={[styles.dot, styles.halfDot, { backgroundColor: currentBanner >= 3 ? "#8B4513" : "#ccc" }]}
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
    color: "#000000",
    marginTop: 5,
    fontWeight: "bold",
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
});

export default HomeScreen;