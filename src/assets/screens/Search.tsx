import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePromotions } from "../context/PromotionsContext";

import {
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "../style/SearchStyles";

// Dữ liệu cửa hàng (mô phỏng)
const stores = [
  {
    id: "store1",
    name: "Trà Sữa Rắc Rối",
    rating: "9.8",
    reviews: "6K",
    distance: "6K",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
  },
];
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
// Dữ liệu sản phẩm
const promotions: Promotion[] = [
  {
    id: "1",
    title: "Caramel Matcha",
    price: "3.75USD",
    description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Hot",
    tagColor: "#FF6347",
    product: "Carefully selected soft and fragrant taro, slow-cooked by hand to achieve a rich and silky texture — every bite bursting with taro flavor. Paired with crystal-clear peach gum, rich in collagen for a refreshing, beauty-boosting treat. Infused with creamy milk tea, where the aroma of tea blends perfectly with the smoothness of milk. A generously filled cup with premium ingredients — the perfect indulgence for your relaxing moments",
  },
  {
    id: "2",
    title: "Berry Bliss",
    price: "2.50USD",
    description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda4a0025f51ed3cf/view?project=67ed5f5e00176f489872&mode=admin",
    tag: "New",
    tagColor: "#FF8C00",
  },
  {
    id: "3",
    title: "Tropical Yogurt",
    price: "3.90USD",
    description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/1/view?project=67ed5f5e00176f489872&mode=admin",
    tag: "Seasonal",
    tagColor: "#32CD32",
  },
  {
    id: "4",
    title: "Mocha Thunder",
    price: "2.95USD",
    description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda8a0003883d0016/view?project=67ed5f5e00176f489872&mode=admin",
    tag: "Hot",
    tagColor: "#FF6347",
  },
  {
    id: "5",
    title: "Peach Tea",
    price: "2.30USD",
    description: "FRUITY & TANGY | SUMMER VIBES",
    image: "https://cloud.appwrite.io/v1/storage/buckets/67ed61c3001dff3f41f1/files/67fbda56000979606ad6/view?project=67ed5f5e00176f489872&mode=admin",
    tag: "New",
    tagColor: "#FF8C00",
  },
  {
    id: "6",
    title: "Mocha Thunder",
    price: "2.95USD",
    description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Hot",
    tagColor: "#FF6347",
  },
  {
    id: "7",
    title: "Peach Tea",
    price: "2.30USD",
    description: "FRUITY & TANGY | SUMMER VIBES",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "New",
    tagColor: "#FF8C00",
  },
  {
    id: "8",
    title: "Lychee Fizz",
    price: "3.10USD",
    description: "REFRESHING | HINT OF LIME | FRUITY BURST",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Seasonal",
    tagColor: "#32CD32",
  },
  {
    id: "9",
    title: "Choco Mint",
    price: "3.65USD",
    description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Hot",
    tagColor: "#FF6347",
  },
  {
    id: "10",
    title: "Strawberry Cheese",
    price: "2.45USD",
    description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "New",
    tagColor: "#FF8C00",
  },
  {
    id: "11",
    title: "Matcha Smoothie",
    price: "3.55USD",
    description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Seasonal",
    tagColor: "#32CD32",
  },
  {
    id: "12",
    title: "Coconut Latte",
    price: "3.20USD",
    description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Hot",
    tagColor: "#FF6347",
  },
  {
    id: "13",
    title: "Green Apple Mojito",
    price: "1.89USD",
    description: "REFRESHING | HINT OF LIME | FRUITY BURST",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "New",
    tagColor: "#FF8C00",
  },
  {
    id: "14",
    title: "Vanilla Cloud",
    price: "2.90USD",
    description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Seasonal",
    tagColor: "#32CD32",
  },
  {
    id: "15",
    title: "Rose Latte",
    price: "3.70USD",
    description: "FRUITY & TANGY | SUMMER VIBES",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "New",
    tagColor: "#FF8C00",
  },
  {
    id: "16",
    title: "Banana Brew",
    price: "2.85USD",
    description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Hot",
    tagColor: "#FF6347",
  },
  {
    id: "17",
    title: "Pineapple Punch",
    price: "3.25USD",
    description: "FRUITY & TANGY | SUMMER VIBES",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Seasonal",
    tagColor: "#32CD32",
  },
  {
    id: "18",
    title: "Double Espresso",
    price: "2.75USD",
    description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Hot",
    tagColor: "#FF6347",
  },
  {
    id: "19",
    title: "Lavender Dream",
    price: "3.60USD",
    description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "New",
    tagColor: "#FF8C00",
  },
  {
    id: "20",
    title: "Oreo Milkshake",
    price: "3.80USD",
    description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Seasonal",
    tagColor: "#32CD32",
  },
  {
    id: "21",
    title: "Mango Tango",
    price: "2.95USD",
    description: "REFRESHING | HINT OF LIME | FRUITY BURST",
    image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
    tag: "Hot",
    tagColor: "#FF6347",
  },
];

const Search = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [filteredpromotions, setFilteredpromotions] = useState(promotions);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>(null); // Thêm trạng thái để theo dõi tab được chọn

  /**
   * Lưu lịch sử tìm kiếm vào AsyncStorage
   * @param searches - Mảng các chuỗi tìm kiếm gần đây để lưu
   */
  const saveRecentSearches = useCallback(async (searches: string[]) => {
    try {
      await AsyncStorage.setItem("recentSearches", JSON.stringify(searches));
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử tìm kiếm:", error);
    }
  }, []);

  /**
   * Tải lịch sử tìm kiếm từ AsyncStorage
   * Duy trì lịch sử tìm kiếm giữa các phiên ứng dụng
   */
  const loadRecentSearches = useCallback(async () => {
    try {
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      if (storedSearches) {
        setRecent(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error("Lỗi khi tải lịch sử tìm kiếm:", error);
    }
  }, []);

  /**
   * Hook hiệu ứng để tải lịch sử tìm kiếm khi component được gắn kết
   */
  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  /**
   * Tạo gợi ý tìm kiếm dựa trên đầu vào của người dùng
   * Lọc dữ liệu promotions và giới hạn ở 5 gợi ý
   */
  const suggestionsData = useMemo(() => {
    if (!searchText.trim() || hasSearched) {
      return [];
    }
    const queryLower = searchText.toLowerCase();
    return promotions
      .filter((item) => {
        const priceWithoutUSD = item.price.replace("USD", "").trim();
        return (
          item.title.toLowerCase().includes(queryLower) ||
          item.description.toLowerCase().includes(queryLower) ||
          (item.tag && item.tag.toLowerCase().includes(queryLower)) ||
          priceWithoutUSD.includes(queryLower)
        );
      })
      .slice(0, 5);
  }, [searchText, hasSearched]);

  /**
   * Cập nhật gợi ý và kết quả tìm kiếm khi đầu vào người dùng thay đổi
   */
  useEffect(() => {
    setSuggestions(suggestionsData);

    if (!searchText.trim()) {
      setFilteredpromotions(promotions);
      setHasSearched(false);
    } else {
      const queryLower = searchText.toLowerCase();
      const filtered = promotions
        .filter((item) => {
          const priceWithoutUSD = item.price.replace("USD", "").trim();
          return (
            item.title.toLowerCase().includes(queryLower) ||
            item.description.toLowerCase().includes(queryLower) ||
            (item.tag && item.tag.toLowerCase().includes(queryLower)) ||
            priceWithoutUSD.includes(queryLower)
          );
        })
        .slice(0, 10);
      setFilteredpromotions(filtered);
    }
  }, [searchText, suggestionsData]);

  /**
   * Thực hiện tìm kiếm khi người dùng nhấn enter hoặc chọn gợi ý
   * Cập nhật lịch sử tìm kiếm, ẩn gợi ý và đóng bàn phím
   * @param query - Chuỗi tìm kiếm do người dùng nhập
   */
  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredpromotions(promotions);
        setSearchText("");
        setSuggestions([]);
        setHasSearched(false);
        setSelectedTab(null); // Đặt lại tab được chọn khi không có query
        return;
      }

      const updatedRecent = recent.includes(query) ? recent : [query, ...recent.slice(0, 9)];
      setRecent(updatedRecent);
      saveRecentSearches(updatedRecent);

      const filtered = promotions
        .filter((item) => {
          const queryLower = query.toLowerCase();
          const priceWithoutUSD = item.price.replace("USD", "").trim();
          return (
            item.title.toLowerCase().includes(queryLower) ||
            item.description.toLowerCase().includes(queryLower) ||
            (item.tag && item.tag.toLowerCase().includes(queryLower)) ||
            priceWithoutUSD.includes(queryLower)
          );
        })
        .slice(0, 10);
      setFilteredpromotions(filtered);

      setSearchText(query);
      setSuggestions([]);
      setHasSearched(true);
      Keyboard.dismiss();
    },
    [recent, saveRecentSearches]
  );

  /**
   * Xử lý tìm kiếm khi người dùng nhấn phím enter/return
   */
  const handleSearch = useCallback(() => {
    performSearch(searchText);
  }, [searchText, performSearch]);

  /**
   * Xử lý gửi tìm kiếm khi người dùng nhấn phím enter/return
   */
  const handleSubmitEditing = useCallback(() => {
    handleSearch();
  }, [handleSearch]);

  /**
   * Xử lý khi người dùng chọn một gợi ý
   * Cập nhật trạng thái tìm kiếm dựa trên gợi ý được chọn
   * @param title - Tiêu đề của gợi ý được chọn
   */
  const handleSuggestionPress = useCallback(
    (title: string) => {
      setSelectedTab(title); // Cập nhật tab được chọn khi chọn gợi ý
      performSearch(title);
    },
    [performSearch]
  );

  /**
   * Xóa một chuỗi tìm kiếm cụ thể khỏi lịch sử tìm kiếm
   * @param item - Chuỗi tìm kiếm cần xóa
   */
  const removeRecentSearch = useCallback(
    (item: string) => {
      const updatedRecent = recent.filter((search) => search !== item);
      setRecent(updatedRecent);
      saveRecentSearches(updatedRecent);
      if (selectedTab === item) {
        setSelectedTab(null); // Đặt lại tab được chọn nếu tab bị xóa
      }
    },
    [recent, saveRecentSearches, selectedTab]
  );

  /**
   * Xóa toàn bộ lịch sử tìm kiếm khỏi bộ nhớ và trạng thái
   */
  const clearAllRecentSearches = useCallback(() => {
    setRecent([]);
    saveRecentSearches([]);
    setSelectedTab(null); // Đặt lại tab được chọn khi xóa tất cả
  }, [saveRecentSearches]);

  /**
   * Hiển thị một mục lịch sử tìm kiếm
   * @param item - Chuỗi tìm kiếm để hiển thị
   */
  const renderRecentSearch = useCallback(
    ({ item }: { item: string }) => {
      const isSelected = selectedTab === item; // Kiểm tra xem tab này có được chọn không
      return (
        <TouchableOpacity
          style={[
            styles.recentSearchItem,
            { backgroundColor: isSelected ? "#AB9377" : "#FFFFFF" }, // Đổi màu nền: xám nhạt nếu được chọn, trắng nếu không
          ]}
          onPress={() => {
            setSelectedTab(item); // Cập nhật tab được chọn
            performSearch(item); // Thực hiện tìm kiếm
          }}
        >
          <Text style={styles.recentSearchText}>{item}</Text>
          <TouchableOpacity onPress={() => removeRecentSearch(item)}>
            <Ionicons name="close" size={20} color="#888" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    },
    [removeRecentSearch, performSearch, selectedTab]
  );

  /**
   * Hiển thị một mục sản phẩm trong kết quả tìm kiếm (chế độ mặc định - danh sách dọc)
   * Bao gồm chi tiết sản phẩm và thẻ nếu có
   * @param item - Mục sản phẩm để hiển thị
   * @param index - Vị trí của mục trong danh sách
   */
  const renderHottestSearchDefault = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Animatable.View
        animation={{
          from: { translateY: -50, opacity: 0 },
          to: { translateY: 0, opacity: 1 },
        }}
        duration={900}
        delay={index * 50}
        easing="ease-out"
        style={styles.hottestSearchItem}
      >
        <Image source={{ uri: item.image }} style={styles.hottestSearchImage} />
        <View style={styles.hottestSearchTextContainerDefault}>
          <Text style={styles.hottestSearchTitleDefault}>{item.title}</Text>
          <Text style={styles.hottestSearchDescriptionDefault}>{item.description}</Text>
        </View>
        {item.tag && (
          <View style={[styles.tagContainer, { backgroundColor: item.tagColor }]}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}
      </Animatable.View>
    ),
    []
  );

  /**
   * Hiển thị một mục sản phẩm trong kết quả tìm kiếm (chế độ lưới)
   * Bao gồm chi tiết sản phẩm và thẻ nếu có
   * @param item - Mục sản phẩm để hiển thị
   * @param index - Vị trí của mục trong danh sách
   */
  const renderHottestSearchGrid = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Animatable.View
        animation={{
          from: { translateY: -50, opacity: 0 },
          to: { translateY: 0, opacity: 1 },
        }}
        duration={900}
        delay={index * 50}
        easing="ease-out"
        style={styles.hottestSearchGridItem}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.hottestSearchGridImage} />
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons name="heart-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.hottestSearchTextContainerGrid}>
          <Text style={styles.hottestSearchTitleGrid}>{item.title}</Text>
          <Text style={styles.hottestSearchDescriptionGrid}>{item.description}</Text>
          <Text style={styles.hottestSearchPrice}>
            {parseFloat(item.price.replace("USD", "")).toFixed(2)}USD
          </Text>
        </View>
      </Animatable.View>
    ),
    []
  );

  /**
   * Hiển thị một mục kết quả cửa hàng
   * Bao gồm chi tiết cửa hàng như tên, đánh giá, số lượt đánh giá và khoảng cách
   * @param item - Mục cửa hàng để hiển thị
   */
  const renderStoreResult = useCallback(
    ({ item }: { item: any }) => (
      <TouchableOpacity style={styles.storeResultItem}>
        <Image source={{ uri: item.image }} style={styles.storeResultImage} />
        <View style={styles.storeResultTextContainer}>
          <Text style={styles.storeResultName}>{item.name}</Text>
          <Text style={styles.storeResultInfo}>
            {item.rating} ({item.reviews} đánh giá) • {item.distance} km
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#888" />
      </TouchableOpacity>
    ),
    []
  );

  /**
   * Hiển thị một mục gợi ý tìm kiếm
   * @param item - Mục gợi ý để hiển thị
   */
  const renderSuggestion = useCallback(
    ({ item }: { item: any }) => (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => handleSuggestionPress(item.title)}
      >
        <Text style={styles.suggestionText}>{item.title}</Text>
      </TouchableOpacity>
    ),
    [handleSuggestionPress]
  );

  /**
   * Giới hạn số lượng sản phẩm hiển thị (8 sản phẩm)
   * @returns Dữ liệu promotions đã được lọc
   */
  const promotionsData = useMemo(() => {
    return filteredpromotions.slice(0, 8);
  }, [filteredpromotions]);

  // Giao diện chính của component
  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tiêu đề với nút quay lại và ô tìm kiếm */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#888"
              onSubmitEditing={handleSubmitEditing}
              returnKeyType="search"
            />
          </View>
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              renderItem={renderSuggestion}
              keyExtractor={(item) => `suggestion-${item.id}`}
              style={styles.suggestionList}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>
      </View>

      {/* Nội dung chính với lịch sử tìm kiếm và kết quả */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {recent.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
              <TouchableOpacity onPress={clearAllRecentSearches}>
                <Text style={styles.clearAllText}>Xóa tất cả</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recent}
              renderItem={renderRecentSearch}
              keyExtractor={(item, index) => `recent-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentSearchList}
            />
          </View>
        )}

        <View style={styles.section}>
          {searchText.trim() ? (
            <>
              {/* Hiển thị kết quả cửa hàng khi đang tìm kiếm */}
              <FlatList
                data={stores.filter((store) =>
                  store.name.toLowerCase().includes(searchText.toLowerCase())
                )}
                renderItem={renderStoreResult}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>}
                scrollEnabled={false}
              />
              {/* Hiển thị kết quả sản phẩm dạng lưới khi đang tìm kiếm */}
              {promotionsData.length > 0 ? (
                <FlatList
                  data={promotionsData}
                  renderItem={renderHottestSearchGrid}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  key="grid"
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={8}
                  windowSize={5}
                  removeClippedSubviews
                  columnWrapperStyle={styles.columnWrapper}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
              )}
            </>
          ) : (
            <>
              {/* Hiển thị "Tìm kiếm nổi bật" khi chưa nhập tìm kiếm */}
              <Text style={styles.sectionTitle}>Tìm kiếm nổi bật</Text>
              {promotionsData.length > 0 ? (
                <FlatList
                  data={promotionsData}
                  renderItem={renderHottestSearchDefault}
                  keyExtractor={(item) => item.id}
                  numColumns={1}
                  key="list"
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={8}
                  windowSize={5}
                  removeClippedSubviews
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;