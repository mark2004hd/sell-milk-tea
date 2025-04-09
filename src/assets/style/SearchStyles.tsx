import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  searchContainer: ViewStyle;
  inputWrapper: ViewStyle;
  searchIcon: ViewStyle;
  searchInput: TextStyle;
  section: ViewStyle;
  sectionHeader: ViewStyle;
  sectionTitle: TextStyle;
  clearAllText: TextStyle;
  recentSearchList: ViewStyle;
  recentSearchItem: ViewStyle;
  recentSearchText: TextStyle;
  hottestSearchItem: ViewStyle;
  hottestSearchImage: ImageStyle;
  hottestSearchTextContainerDefault: ViewStyle; // Style cho default (dọc)
  hottestSearchTextContainerGrid: ViewStyle; // Style cho grid
  hottestSearchTitleDefault: TextStyle; // Style cho title default
  hottestSearchTitleGrid: TextStyle; // Style cho title grid
  hottestSearchDescriptionDefault: TextStyle; // Style cho description default
  hottestSearchDescriptionGrid: TextStyle; // Style cho description grid
  tagContainer: ViewStyle;
  tagText: TextStyle;
  noResultsText: TextStyle;
  suggestionList: ViewStyle;
  suggestionItem: ViewStyle;
  suggestionText: TextStyle;
  storeResultItem: ViewStyle;
  storeResultImage: ImageStyle;
  storeResultTextContainer: ViewStyle;
  storeResultName: TextStyle;
  storeResultInfo: TextStyle;
  scrollContent: ViewStyle;
  columnWrapper: ViewStyle;
  hottestSearchGridItem: ViewStyle;
  hottestSearchGridImage: ImageStyle;
  imageContainer: ViewStyle;
  heartIcon: ViewStyle;
  hottestSearchPrice: TextStyle;
}

const styles: Styles = StyleSheet.create({
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
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginLeft: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "transparent",
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
    marginBottom: 15,
  },
  hottestSearchImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  // Style cho default (danh sách dọc)
  hottestSearchTextContainerDefault: {
    flex: 1,
    marginTop: 6,
    flexDirection: "column",
    alignItems: "flex-start", // Căn trái cho default
  },
  hottestSearchTitleDefault: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  hottestSearchDescriptionDefault: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
    textAlign: "left",
  },
  // Style cho grid (kết quả tìm kiếm)
  hottestSearchTextContainerGrid: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center", // Căn giữa cho grid
  },
  hottestSearchTitleGrid: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  hottestSearchDescriptionGrid: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
    textAlign: "center",
  },
  tagContainer: {
    borderRadius: 15,
    width: 60, // Kích thước cố định cho chiều rộng
    height: 30, // Kích thước cố định cho chiều cao
    justifyContent: "center", // Căn giữa nội dung theo chiều dọc
    alignItems: "center", // Căn giữa nội dung theo chiều ngang
  },
  tagText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center", // Đảm bảo text căn giữa
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  suggestionList: {
    position: "absolute",
    top: 45,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
  storeResultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  storeResultImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  storeResultTextContainer: {
    flex: 1,
  },
  storeResultName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  storeResultInfo: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  hottestSearchGridItem: {
    width: (SCREEN_WIDTH - 48) / 2,
    marginBottom: 15,
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  hottestSearchGridImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  imageContainer: {
    position: "relative",
  },
  heartIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 5,
  },
  hottestSearchPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
    textAlign: "center",
  },
});

export default styles;