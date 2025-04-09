import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Headers from "../components/Header";

interface Promotion {
  id: string;
  title: string;
  price: string;
  image: string;
}

const promotions: Promotion[] = [
  { id: "1", title: "Salted Caramel Latte", price: "4.29 USD", image: "https://via.placeholder.com/150" },
  { id: "2", title: "Premium Toro Peach Gum", price: "4.29 USD", image: "https://via.placeholder.com/150" },
];

const HomeScreen = () => {
  const renderPromotionItem = ({ item }: { item: Promotion }) => (
    <View style={styles.promotionCard}>
      <Image source={{ uri: item.image }} style={styles.promotionImage} />
      <Text style={styles.promotionTitle}>{item.title}</Text>
      <Text style={styles.promotionPrice}>{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <Headers />
        <View style={styles.banner}>
          <Image
            source={{ uri: "https://via.placeholder.com/300x150" }}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>
            The First Cup of Coffee in Autumn On Sale Now
          </Text>
        </View>

        <View style={styles.promotionsContainer}>
          <Text style={styles.sectionTitle}>Latest Promotions</Text>
          <FlatList
            data={promotions}
            renderItem={renderPromotionItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.promotionList}
            nestedScrollEnabled={true} // Cho phép Tab.Navigator xử lý vuốt trước
            scrollEnabled={true} // Đảm bảo FlatList vẫn cuộn được
          />
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderRadius: 10,
    overflow: "hidden",
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
  },
  promotionsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  promotionList: {
    marginBottom: 10,
  },
  promotionCard: {
    marginRight: 10,
    width: 150,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  promotionImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  promotionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  promotionPrice: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  viewMoreButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },
  viewMoreText: {
    fontSize: 14,
    color: "#333",
  },
});

export default HomeScreen;