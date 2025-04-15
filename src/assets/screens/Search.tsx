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
  price: number; // Đổi sang number
  image: string;
  description: string;
  tag?: string;
  tagColor?: string;
  product?: string;
}

const Search = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const { promotions } = usePromotions();
  const [filteredPromotions, setFilteredPromotions] = useState(promotions);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  /**
   * Lưu lịch sử tìm kiếm vào AsyncStorage
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

  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  /**
   * Tạo gợi ý tìm kiếm dựa trên đầu vào
   */
  const suggestionsData = useMemo(() => {
    if (!searchText.trim() || hasSearched) {
      return [];
    }
    const queryLower = searchText.toLowerCase();
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
      .slice(0, 5);
  }, [searchText, hasSearched, promotions]);

  /**
   * Cập nhật gợi ý và kết quả tìm kiếm
   */
  useEffect(() => {
    setSuggestions(suggestionsData);

    if (!searchText.trim()) {
      setFilteredPromotions(promotions);
      setHasSearched(false);
    } else {
      const queryLower = searchText.toLowerCase();
      const filtered = promotions
        .filter((item) => {
          const priceAsString = item.price.toString();
          return (
            item.title.toLowerCase().includes(queryLower) ||
            item.description.toLowerCase().includes(queryLower) ||
            (item.tag && item.tag.toLowerCase().includes(queryLower)) ||
            priceAsString.includes(queryLower)
          );
        })
        .slice(0, 10);
      setFilteredPromotions(filtered);
    }
  }, [searchText, suggestionsData, promotions]);

  /**
   * Thực hiện tìm kiếm
   */
  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredPromotions(promotions);
        setSearchText("");
        setSuggestions([]);
        setHasSearched(false);
        setSelectedTab(null);
        return;
      }

      const updatedRecent = recent.includes(query) ? recent : [query, ...recent.slice(0, 9)];
      setRecent(updatedRecent);
      saveRecentSearches(updatedRecent);

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
        .slice(0, 10);
      setFilteredPromotions(filtered);

      setSearchText(query);
      setSuggestions([]);
      setHasSearched(true);
      Keyboard.dismiss();
    },
    [recent, saveRecentSearches, promotions]
  );

  /**
   * Xử lý tìm kiếm khi nhấn enter
   */
  const handleSearch = useCallback(() => {
    performSearch(searchText);
  }, [searchText, performSearch]);

  /**
   * Xử lý gửi tìm kiếm
   */
  const handleSubmitEditing = useCallback(() => {
    handleSearch();
  }, [handleSearch]);

  /**
   * Xử lý khi chọn gợi ý
   */
  const handleSuggestionPress = useCallback(
    (title: string) => {
      setSelectedTab(title);
      performSearch(title);
    },
    [performSearch]
  );

  /**
   * Xóa lịch sử tìm kiếm cụ thể
   */
  const removeRecentSearch = useCallback(
    (item: string) => {
      const updatedRecent = recent.filter((search) => search !== item);
      setRecent(updatedRecent);
      saveRecentSearches(updatedRecent);
      if (selectedTab === item) {
        setSelectedTab(null);
      }
    },
    [recent, saveRecentSearches, selectedTab]
  );

  /**
   * Xóa toàn bộ lịch sử tìm kiếm
   */
  const clearAllRecentSearches = useCallback(() => {
    setRecent([]);
    saveRecentSearches([]);
    setSelectedTab(null);
  }, [saveRecentSearches]);

  /**
   * Hiển thị lịch sử tìm kiếm
   */
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

  /**
   * Hiển thị sản phẩm ở chế độ danh sách
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
   * Hiển thị sản phẩm ở chế độ lưới
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
            {item.price.toFixed(2)} USD
          </Text>
        </View>
      </Animatable.View>
    ),
    []
  );

  /**
   * Hiển thị kết quả cửa hàng
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
   * Hiển thị gợi ý tìm kiếm
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
   * Giới hạn số lượng sản phẩm hiển thị
   */
  const promotionsData = useMemo(() => {
    return filteredPromotions.slice(0, 8);
  }, [filteredPromotions]);

  return (
    <SafeAreaView style={styles.container}>
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
              <FlatList
                data={stores.filter((store) =>
                  store.name.toLowerCase().includes(searchText.toLowerCase())
                )}
                renderItem={renderStoreResult}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>}
                scrollEnabled={false}
              />
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