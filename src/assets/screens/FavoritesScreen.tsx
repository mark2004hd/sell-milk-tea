import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFavorites } from "../context/FavoritesContext";

type FavoriteItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  size: "S" | "M" | "L";
};

const FavoritesScreen = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Trà Sữa Trân Châu", "Trà Sữa Matcha", "Trà Sữa Phô Mai"];

  const filteredFavorites = selectedCategory === "All"
    ? favorites
    : favorites.filter((item) => item.title.includes(selectedCategory));

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <TouchableOpacity
          style={styles.removeIcon}
          onPress={() => removeFromFavorites(item.id, item.size)}
        >
          <Icon name="heart" size={wp(5)} color="#FF0000" />
        </TouchableOpacity>
      </View>
      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <Icon
            key={index}
            name={index < 4 ? "star" : "star-outline"}
            size={wp(4)}
            color="#FFD700"
          />
        ))}
        <Text style={styles.reviewsText}>(10)</Text>
      </View>
      <Text style={styles.itemName}>{item.title}</Text>
      <Text style={styles.itemDetails}>
        Flavor: Original - Size: {item.size} {/* Sửa lỗi bằng cách nối chuỗi đúng cách */}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.itemPrice}>{(item.price).toLocaleString()}USD</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <TouchableOpacity>
          <Icon name="search-outline" size={wp(6)} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-outline" size={wp(5)} color="#000" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Icon name="swap-vertical-outline" size={wp(5)} color="#000" />
          <Text style={styles.sortText}>Price: lowest to high</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="grid-outline" size={wp(5)} color="#000" />
        </TouchableOpacity>
      </View>

      {filteredFavorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}-${item.size}`}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  headerTitle: {
    fontSize: wp(5.5),
    fontWeight: "bold",
    color: "#000",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: hp(1),
    flexWrap: "wrap",
  },
  categoryButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
    backgroundColor: "#F0F0F0",
    marginVertical: hp(0.5),
  },
  categoryButtonActive: {
    backgroundColor: "#000",
  },
  categoryText: {
    fontSize: wp(4),
    color: "#000",
  },
  categoryTextActive: {
    color: "#FFF",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    fontSize: wp(4),
    marginLeft: wp(2),
  },
  sortText: {
    fontSize: wp(4),
    marginLeft: wp(2),
  },
  listContainer: {
    paddingHorizontal: wp(2),
  },
  itemContainer: {
    flex: 1,
    margin: wp(2),
    backgroundColor: "#FFF",
  },
  imageContainer: {
    position: "relative",
  },
  itemImage: {
    width: "100%",
    height: hp(20),
    borderRadius: wp(3),
  },
  removeIcon: {
    position: "absolute",
    bottom: hp(1),
    right: wp(2),
    backgroundColor: "#FFF",
    borderRadius: wp(5),
    padding: wp(2),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(1),
  },
  reviewsText: {
    fontSize: wp(3.5),
    color: "#666",
    marginLeft: wp(1),
  },
  itemName: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#000",
  },
  itemDetails: {
    fontSize: wp(3.5),
    color: "#666",
    marginVertical: hp(0.5),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#000",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: wp(5),
    color: "#666",
  },
});

export default FavoritesScreen;