import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { usePromotions } from "../context/PromotionsContext";
import styles from "../style/SearchStyles";

// Định nghĩa kiểu cho các màn hình trong stack navigation
type RootStackParamList = {
  Home: undefined;
  Search: { promotions: Promotion[] };
  Product: { productId: string };
};

// Định nghĩa kiểu cho navigation prop
type NavigationProp = StackNavigationProp<RootStackParamList, "Search">;

// Danh sách cửa hàng mẫu (hard-coded)
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

// Định nghĩa interface cho đối tượng Promotion
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

// Component chính: Search - Màn hình tìm kiếm
const Search = () => {
  // Khởi tạo navigation hook để điều hướng
  const navigation = useNavigation<NavigationProp>();
  // State để lưu trữ văn bản tìm kiếm
  const [searchText, setSearchText] = useState("");
  // State để lưu trữ lịch sử tìm kiếm
  const [recent, setRecent] = useState<string[]>([]);
  // Lấy danh sách khuyến mãi từ context
  const { promotions } = usePromotions();
  // State để lưu trữ danh sách khuyến mãi đã lọc
  const [filteredPromotions, setFilteredPromotions] = useState(promotions);
  // State để lưu trữ danh sách gợi ý tìm kiếm
  const [suggestions, setSuggestions] = useState<any[]>([]);
  // State để kiểm tra xem đã thực hiện tìm kiếm hay chưa
  const [hasSearched, setHasSearched] = useState(false);
  // State để theo dõi tab (lịch sử tìm kiếm) được chọn
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  // Hàm lưu lịch sử tìm kiếm vào AsyncStorage
  const saveRecentSearches = useCallback(async (searches: string[]) => {
    try {
      // Chuyển mảng lịch sử tìm kiếm thành JSON và lưu vào AsyncStorage
      await AsyncStorage.setItem("recentSearches", JSON.stringify(searches));
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử tìm kiếm:", error);
    }
  }, []);

  // Hàm tải lịch sử tìm kiếm từ AsyncStorage
  const loadRecentSearches = useCallback(async () => {
    try {
      // Lấy dữ liệu từ AsyncStorage
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      if (storedSearches) {
        // Parse JSON và cập nhật state recent
        setRecent(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error("Lỗi khi tải lịch sử tìm kiếm:", error);
    }
  }, []);

  // Tải lịch sử tìm kiếm khi component được mount
  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  // Tối ưu danh sách gợi ý tìm kiếm với useMemo
  const suggestionsData = useMemo(() => {
    // Nếu searchText rỗng hoặc đã tìm kiếm, trả về mảng rỗng
    if (!searchText.trim() || hasSearched) {
      return [];
    }
    const queryLower = searchText.toLowerCase();
    // Lọc các khuyến mãi dựa trên title, description, tag, hoặc price
    return promotions
      .filter((item) => {
        const priceAsString = item.price.toString();
        return (
          item.title.toLowerCase().includes(queryLower) ||
          item.description.toLowerCase().includes(queryLower) ||
          (item.tag && item.tag.toLowerCase().includes(queryLower)) ||
          priceAsString.includes(queryLower)
        );
      })
      .slice(0, 5); // Giới hạn 5 gợi ý
  }, [searchText, hasSearched, promotions]);

  // Tối ưu danh sách khuyến mãi đã lọc với useMemo
  const optimizedFilteredPromotions = useMemo(() => {
    // Nếu searchText rỗng, trả về toàn bộ danh sách khuyến mãi
    if (!searchText.trim()) {
      return promotions;
    }
    const queryLower = searchText.toLowerCase();
    // Lọc khuyến mãi dựa trên title, description, tag, hoặc price
    return promotions
      .filter((item) => {
        const priceAsString = item.price.toString();
        return (
          item.title.toLowerCase().includes(queryLower) ||
          item.description.toLowerCase().includes(queryLower) ||
          (item.tag && item.tag.toLowerCase().includes(queryLower)) ||
          priceAsString.includes(queryLower)
        );
      })
      .slice(0, 10); // Giới hạn 10 kết quả
  }, [searchText, promotions]);

  // Cập nhật gợi ý và danh sách khuyến mãi khi searchText thay đổi
  useEffect(() => {
    setSuggestions(suggestionsData);
    setFilteredPromotions(optimizedFilteredPromotions);
  }, [suggestionsData, optimizedFilteredPromotions]);

  // Hàm thực hiện tìm kiếm
  const performSearch = useCallback(
    (query: string) => {
      // Nếu query rỗng, reset trạng thái
      if (!query.trim()) {
        setFilteredPromotions(promotions);
        setSearchText("");
        setSuggestions([]);
        setHasSearched(false);
        setSelectedTab(null);
        return;
      }

      // Cập nhật lịch sử tìm kiếm, đảm bảo không trùng lặp và giới hạn 10 mục
      const updatedRecent = recent.includes(query)
        ? recent
        : [query, ...recent.slice(0, 9)];
      setRecent(updatedRecent);
      saveRecentSearches(updatedRecent);

      // Lọc khuyến mãi dựa trên query
      const filtered = promotions
        .filter((item) => {
          const queryLower = query.toLowerCase();
          const priceAsString = item.price.toString();
          return (
            item.title.toLowerCase().includes(queryLower) ||
            item.description.toLowerCase().includes(queryLower) ||
            (item.tag && item.tag.toLowerCase().includes(queryLower)) ||
            priceAsString.includes(queryLower)
          );
        })
        .slice(0, 10); // Giới hạn 10 kết quả
      setFilteredPromotions(filtered);

      // Cập nhật trạng thái
      setSearchText(query);
      setSuggestions([]);
      setHasSearched(true);
      Keyboard.dismiss(); // Ẩn bàn phím
    },
    [recent, saveRecentSearches, promotions]
  );

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = useCallback(() => {
    performSearch(searchText);
  }, [searchText, performSearch]);

  // Hàm xử lý khi nhấn Enter trên bàn phím
  const handleSubmitEditing = useCallback(() => {
    handleSearch();
  }, [handleSearch]);

  // Hàm xử lý khi nhấn vào gợi ý tìm kiếm
  const handleSuggestionPress = useCallback(
    (title: string) => {
      setSelectedTab(title);
      performSearch(title);
    },
    [performSearch]
  );

  // Hàm xóa một mục trong lịch sử tìm kiếm
  const removeRecentSearch = useCallback(
    (item: string) => {
      // Lọc bỏ mục được chọn khỏi lịch sử
      const updatedRecent = recent.filter((search) => search !== item);
      setRecent(updatedRecent);
      saveRecentSearches(updatedRecent);
      // Nếu mục bị xóa là tab đang chọn, reset selectedTab
      if (selectedTab === item) {
        setSelectedTab(null);
      }
    },
    [recent, saveRecentSearches, selectedTab]
  );

  // Hàm xóa toàn bộ lịch sử tìm kiếm
  const clearAllRecentSearches = useCallback(() => {
    setRecent([]);
    saveRecentSearches([]);
    setSelectedTab(null);
  }, [saveRecentSearches]);

  // Render mục lịch sử tìm kiếm
  const renderRecentSearch = useCallback(
    ({ item }: { item: string }) => {
      const isSelected = selectedTab === item;
      return (
        <TouchableOpacity
          style={[
            styles.recentSearchItem,
            { backgroundColor: isSelected ? "#AB9377" : "#FFFFFF" },
          ]}
          onPress={() => {
            setSelectedTab(item);
            performSearch(item);
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

  // Component hiển thị mục khuyến mãi dạng danh sách, tối ưu với React.memo
  const HottestSearchDefaultItem = React.memo(
    ({ item, index }: { item: any; index: number }) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Product", { productId: item.id })}
      >
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
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.hottestSearchImage}
              resizeMode="cover" // Tối ưu hiển thị hình ảnh
            />
          </View>

          <View style={styles.hottestSearchTextContainerDefault}>
            <Text style={styles.hottestSearchTitleDefault}>{item.title}</Text>
            <Text style={styles.hottestSearchDescriptionDefault}>
              {item.description}
            </Text>
          </View>
          {item.tag && (
            <View
              style={[
                styles.tagContainer,
                { backgroundColor: item.tagColor || "#FF6347" },
              ]}
            >
              <Text style={styles.tagText}>{item.tag}</Text>
            </View>
          )}
        </Animatable.View>
      </TouchableOpacity>
    ),
    (prevProps, nextProps) =>
      prevProps.item.id === nextProps.item.id &&
      prevProps.index === nextProps.index
  );

  // Component hiển thị mục khuyến mãi dạng lưới, tối ưu với React.memo
  const HottestSearchGridItem = React.memo(
    ({ item, index }: { item: any; index: number }) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Product", { productId: item.id })}
      >
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
            <Image
              source={{ uri: item.image }}
              style={styles.hottestSearchGridImage}
              resizeMode="cover" // Tối ưu hiển thị hình ảnh
            />
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>
          <View style={styles.hottestSearchTextContainerGrid}>
            <Text style={styles.hottestSearchTitleGrid}>{item.title}</Text>
            <Text style={styles.hottestSearchDescriptionGrid}>
              {item.description}
            </Text>
            <Text style={styles.hottestSearchPrice}>
              {item.price.toFixed(2)} USD
            </Text>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    ),
    (prevProps, nextProps) =>
      prevProps.item.id === nextProps.item.id &&
      prevProps.index === nextProps.index
  );

  // Render kết quả cửa hàng
  const renderStoreResult = useCallback(
    ({ item }: { item: any }) => (
      <TouchableOpacity style={styles.storeResultItem}>
        <Image
          source={{ uri: item.image }}
          style={styles.storeResultImage}
          resizeMode="cover" // Tối ưu hiển thị hình ảnh
        />
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

  // Render gợi ý tìm kiếm
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

  // Tối ưu danh sách khuyến mãi hiển thị (chỉ lấy 8 mục đầu tiên)
  const promotionsData = useMemo(() => {
    return filteredPromotions.slice(0, 8);
  }, [filteredPromotions]);

  // Giao diện chính của màn hình tìm kiếm
  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút quay lại và thanh tìm kiếm */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
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
          {/* Hiển thị danh sách gợi ý tìm kiếm */}
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              renderItem={renderSuggestion}
              keyExtractor={(item) => `suggestion-${item.id}`}
              style={styles.suggestionList}
              keyboardShouldPersistTaps="handled"
              initialNumToRender={5} // Chỉ render 5 gợi ý ban đầu
              maxToRenderPerBatch={5} // Render tối đa 5 mục mỗi lần
              windowSize={3} // Giảm số lượng cửa sổ trong bộ nhớ
              scrollEnabled={false} // Tắt cuộn để tránh xung đột với ScrollView
            />
          )}
        </View>
      </View>

      {/* Nội dung chính, có thể cuộn */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Phần lịch sử tìm kiếm */}
        {recent.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lịch sử tìm kiếm</Text>
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
              initialNumToRender={5} // Chỉ render 5 mục ban đầu
              maxToRenderPerBatch={5} // Render tối đa 5 mục mỗi lần
              windowSize={3} // Giảm số lượng cửa sổ trong bộ nhớ
            />
          </View>
        )}

        {/* Phần kết quả tìm kiếm */}
        <View style={styles.section}>
          {searchText.trim() ? (
            <>
              {/* Hiển thị kết quả cửa hàng */}
              <FlatList
                data={stores.filter((store) =>
                  store.name.toLowerCase().includes(searchText.toLowerCase())
                )}
                renderItem={renderStoreResult}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                  <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
                }
                scrollEnabled={false}
              />
              {/* Hiển thị khuyến mãi dạng lưới nếu có kết quả */}
              {promotionsData.length > 0 ? (
                <FlatList
                  data={promotionsData}
                  renderItem={({ item, index }) => (
                    <HottestSearchGridItem item={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  key="grid"
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={4} // Chỉ render 4 mục ban đầu (2 hàng)
                  maxToRenderPerBatch={4} // Render tối đa 4 mục mỗi lần
                  windowSize={5} // Giảm số lượng cửa sổ trong bộ nhớ
                  removeClippedSubviews
                  columnWrapperStyle={styles.columnWrapper}
                  scrollEnabled={false} // Tắt cuộn để tránh xung đột với ScrollView
                />
              ) : (
                <Text style={styles.noResultsText}>
                  Không tìm thấy kết quả
                </Text>
              )}
            </>
          ) : (
            <>
              {/* Hiển thị khuyến mãi nổi bật dạng danh sách khi chưa tìm kiếm */}
              <Text style={styles.sectionTitle}>Tìm kiếm nổi bật</Text>
              {promotionsData.length > 0 ? (
                <FlatList
                  data={promotionsData}
                  renderItem={({ item, index }) => (
                    <HottestSearchDefaultItem item={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={1}
                  key="list"
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={4} // Chỉ render 4 mục ban đầu
                  maxToRenderPerBatch={4} // Render tối đa 4 mục mỗi lần
                  windowSize={5} // Giảm số lượng cửa sổ trong bộ nhớ
                  removeClippedSubviews
                  scrollEnabled={false} // Tắt cuộn để tránh xung đột với ScrollView
                />
              ) : (
                <Text style={styles.noResultsText}>
                  Không tìm thấy kết quả
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;