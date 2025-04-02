import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const verificationCodeStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: hp("7%"), // 60px -> 7% chiều cao màn hình
    paddingBottom: hp("1%"), // 10px -> 1% chiều cao
    marginBottom: hp("3%"), // 30px -> 3% chiều cao
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"), // Giảm khoảng cách để đường kẻ gần tiêu đề hơn
    marginHorizontal: wp("5%"), // 24px -> 5% chiều rộng
  },
  backIcon: {
    width: wp("5%"), // 22px -> 5% chiều rộng
    height: wp("5%"), // 22px -> 5% chiều rộng (giữ tỉ lệ vuông)
    marginRight: wp("25%"), // 101px -> 25% chiều rộng
  },
  headerText: {
    color: "#191D31",
    fontSize: wp("5%"), // 16px -> 4% chiều rộng
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginLeft: wp("2%"), 
    marginBottom: hp("0.5%"), // 5px -> 0.5% chiều cao
    marginTop: hp("0.5%"), // 5px -> 0.5% chiều cao
  },
  divider: {
    height: hp("0.2%"), // Giảm chiều cao để đường kẻ mỏng hơn, giống ảnh
    backgroundColor: "#A0A0A0", // Màu xám đậm để rõ hơn
	  marginHorizontal: 0,
	  width: "100%",// Kéo dài toàn bộ chiều rộng
  },
  verificationImage: {
    height: hp("15%"), // 130px -> 15% chiều cao
    width: hp("15%"), // Đảm bảo hình ảnh có tỉ lệ vuông
    marginBottom: hp("5%"), // 44px -> 5% chiều cao
    marginHorizontal: wp("30%"), // 122px -> 30% chiều rộng
    alignSelf: "center",
  },
  titleText: {
    color: "#191D31",
    fontSize: wp("6%"), // 22px -> 6% chiều rộng
    fontWeight: "bold",
    marginBottom: hp("2%"), // 16px -> 2% chiều cao
    marginHorizontal: wp("25%"), // 100px -> 25% chiều rộng
    textAlign: "center",
    alignContent: "center",
  },
  infoText: {
    color: "#A7AEC1",
    fontSize: wp("3.5%"), // 14px -> 3.5% chiều rộng
    textAlign: "center",
    marginBottom: hp("0.5%"), // 5px -> 0.5% chiều cao
    marginHorizontal: wp("10%"), // 44px -> 10% chiều rộng
  },
  mailText: {
    color: "#191D31", // Đổi màu thành đen đậm giống trong ảnh
    fontSize: wp("3.5%"), // 14px -> 3.5% chiều rộng
    fontWeight: "bold", // Làm đậm để giống ảnh
    textAlign: "center",
    marginBottom: hp("6%"), // 50px -> 6% chiều cao
    marginHorizontal: wp("12%"), // 50px -> 12% chiều rộng
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("6%"), // 50px -> 6% chiều cao
    marginHorizontal: wp("6%"), // 25px -> 6% chiều rộng
  },
  codeButton: {
    width: wp("15%"), // 60px -> 15% chiều rộng
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#AA9377",
    borderRadius: wp("3%"), // 15px -> 3% chiều rộng
    borderWidth: 1,
    paddingVertical: hp("3%"), // 25px -> 3% chiều cao
  },
  codeText: {
    color: "#191D31",
    fontSize: wp("6%"), // 24px -> 6% chiều rộng
    fontWeight: "bold",
    textAlign: "center",
  },
  activeCodeContainer: {
    width: wp("15%"), // 60px -> 15% chiều rộng
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#AA9377",
    borderRadius: wp("3%"), // 15px -> 3% chiều rộng
    borderWidth: 1,
    paddingVertical: hp("3%"), // 25px -> 3% chiều cao
  },
  activeCodeDivider: {
    width: 1,
    height: hp("2.5%"), // 20px -> 2.5% chiều cao
    backgroundColor: "#2BACBE",
  },
  emptyCodeBox: {
    width: wp("15%"), // 60px -> 15% chiều rộng
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#AA9377",
    borderRadius: wp("3%"), // 15px -> 3% chiều rộng
    borderWidth: 1,
    paddingVertical: hp("3%"), // 25px -> 3% chiều cao
  },
  confirmButton: {
    alignItems: "center",
    backgroundColor: "#77634C",
    borderRadius: wp("7%"), // 30px -> 7% chiều rộng
    paddingVertical: hp("2.5%"), // 22px -> 2.5% chiều cao
    marginBottom: hp("3%"), // 24px -> 3% chiều cao
    marginHorizontal: wp("5%"), // 24px -> 5% chiều rộng
  },
  confirmText: {
    color: "#FFFFFF",
    fontSize: wp("4.5%"), // 18px -> 4.5% chiều rộng
    fontWeight: "bold",
  },
  retryText: {
    color: "#A7AEC1",
    fontSize: wp("3.5%"), // 14px -> 3.5% chiều rộng
    marginBottom: hp("18%"), // 150px -> 18% chiều cao
    textAlign: "center",
  },
  retry: {
    color: "#AB9377",
    fontSize: wp("3.5%"), // 14px -> 3.5% chiều rộng
  },
  bottomBar: {
    height: hp("0.6%"), // 5px -> 0.6% chiều cao
    backgroundColor: "#191D31",
    borderRadius: wp("25%"), // 100px -> 25% chiều rộng
    marginHorizontal: wp("30%"), // 120px -> 30% chiều rộng
  },
});

export default verificationCodeStyle;