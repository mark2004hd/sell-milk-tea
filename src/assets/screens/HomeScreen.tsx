import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";

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

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Fetch promotions từ API
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://192.168.37.108:8080/api/promotions"
        );
        if (response.data.Response === "True") {
          setPromotions(response.data.Promotion);
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  // Banner carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBanner + 1) % bannerImages.length;
      setCurrentBanner(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBanner]);

  // Xử lý nút back
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

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
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

  // Điều hướng đến Search với promotions
 

  const renderPromotionItem = ({ item }: { item: Promotion }) => (
    <TouchableOpacity
      style={styles.promotionCard}
      onPress={() => console.log(`Pressed on ${item.title}`)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.promotionImage}
        onError={(error) =>
          console.log("Image load error:", error.nativeEvent)
        }
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
                        backgroundColor:
                          currentBanner === index ? "#8B4513" : "#ccc",
                      },
                    ]}
                  />
                ))}
                <View
                  style={[
                    styles.dot,
                    styles.halfDot,
                    {
                      backgroundColor:
                        currentBanner >= 3 ? "#8B4513" : "#ccc",
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.promotionsContainer}>
              <View style={styles.promotionsHeader}>
                <Text style={styles.sectionTitle}>LATEST PROMOTIONS</Text>
                <TouchableOpacity style={styles.viewMoreButton} >
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
          <Text style={styles.modalMessage}>
            Bạn có chắc chắn muốn thoát không?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}
            >
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