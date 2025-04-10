import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Thêm import AsyncStorage
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	Keyboard,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

// Dữ liệu giả cho Hottest Searches (giữ nguyên như bạn đã cung cấp)
const hottestSearches = [
	{
		id: "841230",
		title: "Caramel Matcha",
		price: "3.75USD",
		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
	},
	{
		id: "291384",
		title: "Berry Bliss",
		price: "2.50USD",
		description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
	},
	{
		id: "108347",
		title: "Tropical Yogurt",
		price: "3.90USD",
		description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
	},
	{
		id: "753920",
		title: "Mocha Thunder",
		price: "2.95USD",
		description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
	},
	{
		id: "672839",
		title: "Peach Tea",
		price: "2.30USD",
		description: "FRUITY & TANGY | SUMMER VIBES",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
	},
	{
		id: "945182",
		title: "Lychee Fizz",
		price: "3.10USD",
		description: "REFRESHING | HINT OF LIME | FRUITY BURST",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
	},
	{
		id: "209384",
		title: "Choco Mint",
		price: "3.65USD",
		description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
	},
	{
		id: "384720",
		title: "Strawberry Cheese",
		price: "2.45USD",
		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
	},
	{
		id: "583920",
		title: "Matcha Smoothie",
		price: "3.55USD",
		description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
	},
	{
		id: "329847",
		title: "Coconut Latte",
		price: "3.20USD",
		description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
	},
	{
		id: "483920",
		title: "Green Apple Mojito",
		price: "1.89USD",
		description: "REFRESHING | HINT OF LIME | FRUITY BURST",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
	},
	{
		id: "823490",
		title: "Vanilla Cloud",
		price: "2.90USD",
		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
	},
	{
		id: "902384",
		title: "Rose Latte",
		price: "3.70USD",
		description: "FRUITY & TANGY | SUMMER VIBES",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
	},
	{
		id: "120384",
		title: "Banana Brew",
		price: "2.85USD",
		description: "CREAMY YOGURT | MIXED TROPICAL FRUITS | CHILLED",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
	},
	{
		id: "674390",
		title: "Pineapple Punch",
		price: "3.25USD",
		description: "FRUITY & TANGY | SUMMER VIBES",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
	},
	{
		id: "984312",
		title: "Double Espresso",
		price: "2.75USD",
		description: "STRONG & BOLD | HIGH CAFFEINE | INTENSE FLAVOR",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
	},
	{
		id: "543209",
		title: "Lavender Dream",
		price: "3.60USD",
		description: "COOL & SMOOTH | CHOCOLATE DELIGHT",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
	},
	{
		id: "832947",
		title: "Oreo Milkshake",
		price: "3.80USD",
		description: "SWEET & CREAMY|TOPPED WITH CHEESE FOAM",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Seasonal",
		tagColor: "#32CD32",
	},
	{
		id: "710293",
		title: "Mango Tango",
		price: "2.95USD",
		description: "REFRESHING | HINT OF LIME | FRUITY BURST",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "Hot",
		tagColor: "#FF6347",
	},
	{
		id: "603948",
		title: "Honey Lemon",
		price: "3.45USD",
		description: "FRUITY & TANGY | SUMMER VIBES",
		image: "https://raw.githubusercontent.com/mark2004hd/img-api/master/coffee/RiceMochi.png",
		tag: "New",
		tagColor: "#FF8C00",
	},
];

const Search = () => {
	const navigation = useNavigation();
	const [searchText, setSearchText] = useState("");
	const [recent, setRecent] = useState<string[]>([]); // Khởi tạo recentSearches rỗng
	const [filteredHottestSearches, setFilteredHottestSearches] = useState(hottestSearches);

	// Hàm để lưu lịch sử tìm kiếm vào AsyncStorage
	const saveRecentSearches = async (searches: string[]) => {
		try {
			await AsyncStorage.setItem("recentSearches", JSON.stringify(searches));
		} catch (error) {
			console.log("Error saving recent searches:", error);
		}
	};

	// Hàm để lấy lịch sử tìm kiếm từ AsyncStorage
	const loadRecentSearches = async () => {
		try {
			const storedSearches = await AsyncStorage.getItem("recentSearches");
			if (storedSearches) {
				setRecent(JSON.parse(storedSearches));
			}
		} catch (error) {
			console.log("Error loading recent searches:", error);
		}
	};

	// Tải lịch sử tìm kiếm khi component được mount
	useEffect(() => {
		loadRecentSearches();
	}, []);

	// Hàm xử lý tìm kiếm
	const handleSearch = () => {
		if (searchText.trim() === "") return; // Không lưu nếu từ khóa rỗng

		// Cập nhật danh sách recentSearches
		const updatedRecent = recent.includes(searchText)
			? recent // Không thêm nếu từ khóa đã tồn tại
			: [searchText, ...recent.slice(0, 9)]; // Giới hạn 10 mục, thêm vào đầu danh sách

		setRecent(updatedRecent);
		saveRecentSearches(updatedRecent); // Lưu vào AsyncStorage

		// Lọc danh sách hottestSearches dựa trên từ khóa
		const filtered = hottestSearches.filter(
			(item) =>
				item.title.toLowerCase().includes(searchText.toLowerCase()) ||
				item.description.toLowerCase().includes(searchText.toLowerCase()),
		);
		setFilteredHottestSearches(filtered);

		// Ẩn bàn phím sau khi tìm kiếm
		Keyboard.dismiss();
	};

	// Xử lý khi nhấn Enter trên bàn phím
	const handleSubmitEditing = () => {
		handleSearch();
	};

	// Xóa một mục trong Recent Searches
	const removeRecentSearch = (item: string) => {
		const updatedRecent = recent.filter((search) => search !== item);
		setRecent(updatedRecent);
		saveRecentSearches(updatedRecent); // Cập nhật AsyncStorage
	};

	// Xóa toàn bộ Recent Searches
	const clearAllRecentSearches = () => {
		setRecent([]);
		saveRecentSearches([]); // Xóa trong AsyncStorage
	};

	// Render mỗi mục trong Recent Searches
	const renderRecentSearch = ({ item }: { item: string }) => (
		<View style={styles.recentSearchItem}>
			<Text style={styles.recentSearchText}>{item}</Text>
			<TouchableOpacity onPress={() => removeRecentSearch(item)}>
				<Ionicons name="close" size={20} color="#888" />
			</TouchableOpacity>
		</View>
	);

	// Render mỗi mục trong Hottest Searches
	const renderHottestSearch = ({ item }: { item: any }) => (
		<TouchableOpacity style={styles.hottestSearchItem}>
			<Image source={{ uri: item.image }} style={styles.hottestSearchImage} />
			<View style={styles.hottestSearchTextContainer}>
				<Text style={styles.hottestSearchTitle}>{item.title}</Text>
				<Text style={styles.hottestSearchDescription}>{item.description}</Text>
			</View>
			<View style={[styles.tagContainer, { backgroundColor: item.tagColor }]}>
				<Text style={styles.tagText}>{item.tag}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header với nút back và thanh tìm kiếm */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name="chevron-back" size={24} color="#333" />
				</TouchableOpacity>
				<TextInput
					style={styles.searchInput}
					placeholder="Search..."
					value={searchText}
					onChangeText={setSearchText}
					placeholderTextColor="#888"
					onSubmitEditing={handleSubmitEditing}
					returnKeyType="search"
				/>
				<TouchableOpacity onPress={handleSearch} style={styles.searchButton}></TouchableOpacity>
			</View>

			{/* Phần Recent Searches */}
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
						keyExtractor={(item, index) => index.toString()}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.recentSearchList}
					/>
				</View>
			)}

			{/* Phần Hottest Searches */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Hottest Searches</Text>
				{filteredHottestSearches.length > 0 ? (
					<FlatList
						data={filteredHottestSearches}
						renderItem={renderHottestSearch}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text style={styles.noResultsText}>No results found</Text>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	searchInput: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 20,
		paddingHorizontal: 16,
		marginLeft: 10,
		fontSize: 16,
		color: "#333",
	},
	searchButton: {
		marginLeft: 10,
	},
	section: {
		marginTop: 20,
		paddingHorizontal: 16,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	clearAllText: {
		fontSize: 14,
		color: "#888",
	},
	recentSearchList: {
		paddingVertical: 5,
	},
	recentSearchItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 12,
		marginRight: 10,
	},
	recentSearchText: {
		fontSize: 14,
		color: "#333",
		marginRight: 8,
	},
	hottestSearchItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	hottestSearchImage: {
		width: 60,
		height: 60,
		borderRadius: 10,
		marginRight: 10,
	},
	hottestSearchTextContainer: {
		flex: 1,
	},
	hottestSearchTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
	hottestSearchDescription: {
		fontSize: 14,
		color: "#888",
		marginTop: 2,
	},
	tagContainer: {
		borderRadius: 15,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	tagText: {
		fontSize: 12,
		color: "#fff",
		fontWeight: "bold",
	},
	noResultsText: {
		fontSize: 16,
		color: "#888",
		textAlign: "center",
		marginTop: 20,
	},
});

export default Search;
