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

type RootStackParamList = {
	Home: undefined;
	Search: { promotions: Promotion[] };
	Product: { productId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Search">;

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
	price: number;
	image: string;
	description: string;
	tag?: string;
	tagColor?: string;
	product?: string;
}

const Search = () => {
	const navigation = useNavigation<NavigationProp>();
	const [searchText, setSearchText] = useState("");
	const [recent, setRecent] = useState<string[]>([]);
	const { promotions } = usePromotions();
	const [filteredPromotions, setFilteredPromotions] = useState(promotions);
	const [suggestions, setSuggestions] = useState<any[]>([]);
	const [hasSearched, setHasSearched] = useState(false);
	const [selectedTab, setSelectedTab] = useState<string | null>(null);

	// Hàm lưu lịch sử tìm kiếm vào AsyncStorage
	const saveRecentSearches = useCallback(async (searches: string[]) => {
		try {
			await AsyncStorage.setItem("recentSearches", JSON.stringify(searches));
		} catch (error) {
			console.error("Lỗi khi lưu lịch sử tìm kiếm:", error);
		}
	}, []);

	// Hàm tải lịch sử tìm kiếm từ AsyncStorage
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

	// Tải lịch sử tìm kiếm khi component được mount
	useEffect(() => {
		loadRecentSearches();
	}, [loadRecentSearches]);

	// Tối ưu danh sách gợi ý tìm kiếm với useMemo
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

	// Tối ưu danh sách khuyến mãi được lọc với useMemo
	const optimizedFilteredPromotions = useMemo(() => {
		if (!searchText.trim()) {
			return promotions;
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
			.slice(0, 10);
	}, [searchText, promotions]);

	// Cập nhật danh sách khuyến mãi và gợi ý khi searchText thay đổi
	useEffect(() => {
		setSuggestions(suggestionsData);
		setFilteredPromotions(optimizedFilteredPromotions);
	}, [suggestionsData, optimizedFilteredPromotions]);

	// Hàm thực hiện tìm kiếm
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
		[recent, saveRecentSearches, promotions],
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
		[performSearch],
	);

	// Hàm xóa một mục trong lịch sử tìm kiếm
	const removeRecentSearch = useCallback(
		(item: string) => {
			const updatedRecent = recent.filter((search) => search !== item);
			setRecent(updatedRecent);
			saveRecentSearches(updatedRecent);
			if (selectedTab === item) {
				setSelectedTab(null);
			}
		},
		[recent, saveRecentSearches, selectedTab],
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
					}}>
					<Text style={styles.recentSearchText}>{item}</Text>
					<TouchableOpacity onPress={() => removeRecentSearch(item)}>
						<Ionicons name="close" size={20} color="#888" />
					</TouchableOpacity>
				</TouchableOpacity>
			);
		},
		[removeRecentSearch, performSearch, selectedTab],
	);

	// Component hiển thị mục khuyến mãi dạng danh sách, bọc trong React.memo để tối ưu
	const HottestSearchDefaultItem = React.memo(
		({ item, index }: { item: any; index: number }) => (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => navigation.navigate("Product", { productId: item.id })}>
				<Animatable.View
					animation={{
						from: { translateY: -50, opacity: 0 },
						to: { translateY: 0, opacity: 1 },
					}}
					duration={900}
					delay={index * 50}
					easing="ease-out"
					style={styles.hottestSearchItem}>
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
							]}>
							<Text style={styles.tagText}>{item.tag}</Text>
						</View>
					)}
				</Animatable.View>
			</TouchableOpacity>
		),
		(prevProps, nextProps) =>
			prevProps.item.id === nextProps.item.id && prevProps.index === nextProps.index,
	);

	// Component hiển thị mục khuyến mãi dạng lưới, bọc trong React.memo để tối ưu
	const HottestSearchGridItem = React.memo(
		({ item, index }: { item: any; index: number }) => (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => navigation.navigate("Product", { productId: item.id })}>
				<Animatable.View
					animation={{
						from: { translateY: -50, opacity: 0 },
						to: { translateY: 0, opacity: 1 },
					}}
					duration={900}
					delay={index * 50}
					easing="ease-out"
					style={styles.hottestSearchGridItem}>
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
			prevProps.item.id === nextProps.item.id && prevProps.index === nextProps.index,
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
		[],
	);

	// Render gợi ý tìm kiếm
	const renderSuggestion = useCallback(
		({ item }: { item: any }) => (
			<TouchableOpacity
				style={styles.suggestionItem}
				onPress={() => handleSuggestionPress(item.title)}>
				<Text style={styles.suggestionText}>{item.title}</Text>
			</TouchableOpacity>
		),
		[handleSuggestionPress],
	);

	// Tối ưu danh sách khuyến mãi hiển thị (chỉ lấy 8 mục đầu tiên)
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
						<Ionicons
							name="search"
							size={20}
							color="#888"
							style={styles.searchIcon}
						/>
						<TextInput
							style={styles.searchInput}
							placeholder="
Searching..."
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
							initialNumToRender={5} // Chỉ render 5 gợi ý ban đầu
							maxToRenderPerBatch={5} // Render tối đa 5 mục mỗi lần
							windowSize={3} // Giảm số lượng cửa sổ trong bộ nhớ
							scrollEnabled={false} // Tắt cuộn để tránh xung đột với ScrollView
						/>
					)}
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
				{recent.length > 0 && (
					<View style={styles.section}>
						<View style={styles.sectionHeader}>
							<Text style={styles.sectionTitle}>Recent Searches</Text>
							<TouchableOpacity onPress={clearAllRecentSearches}>
								<Text style={styles.clearAllText}>Clear all</Text>
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

				<View style={styles.section}>
					{searchText.trim() ? (
						<>
							<FlatList
								data={stores.filter((store) =>
									store.name
										.toLowerCase()
										.includes(searchText.toLowerCase()),
								)}
								renderItem={renderStoreResult}
								keyExtractor={(item) => item.id}
								ListHeaderComponent={
									<Text style={styles.sectionTitle}>
										Search results
									</Text>
								}
								scrollEnabled={false}
							/>
							{promotionsData.length > 0 ? (
								<FlatList
									data={promotionsData}
									renderItem={({ item, index }) => (
										<HottestSearchGridItem
											item={item}
											index={index}
										/>
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
							<Text style={styles.sectionTitle}>Featured search</Text>
							{promotionsData.length > 0 ? (
								<FlatList
									data={promotionsData}
									renderItem={({ item, index }) => (
										<HottestSearchDefaultItem
											item={item}
											index={index}
										/>
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
									No results found
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
