import { StyleSheet, Dimensions } from "react-native";

// Lấy kích thước màn hình
const { width, height } = Dimensions.get("window");

const sigupStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: height * 0.1, // 10% chiều cao thay vì 77 cố định
    // Xóa position: "absolute" vì không cần thiết trong hầu hết trường hợp
  },
  header: {
    color: "#191D31",
    fontSize: width * 0.058, // ~22px trên màn 375px
    fontWeight: "bold",
    marginBottom: height * 0.015, // ~11px
    marginLeft: width * 0.066, // ~25px
  },
  wellcome: {
    color: "#A7AEC1",
    fontSize: width * 0.037, // ~14px
    marginBottom: height * 0.05, // ~38px
    marginHorizontal: width * 0.066, // ~25px
  },
  userName: {
    color: "#191D31",
    fontSize: width * 0.042, // ~16px
    fontWeight: "bold",
    marginBottom: height * 0.013, // ~10px
    marginLeft: width * 0.069, // ~26px
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBFBFD",
    borderColor: "#F9F9F9",
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: width * 0.037, // ~14px
    marginBottom: height * 0.033, // ~25px
    marginHorizontal: width * 0.064, // ~24px
  },
  userNameigm: {
    width: width * 0.064, // ~24px
    height: width * 0.064, // ~24px
    marginRight: width * 0.042, // ~16px
  },
  textInputUserName: {
    color: "#A7AEC1",
    fontSize: width * 0.037, // ~14px
    flex: 1,
    paddingVertical: height * 0.02, // ~15px
  },
  phoneNumber: {
    color: "#191D31",
    fontSize: width * 0.042, // ~16px
    fontWeight: "bold",
    marginBottom: height * 0.013, // ~10px
    marginLeft: width * 0.069, // ~26px
  },
  contactPhoneNumber: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBFBFD",
    borderColor: "#F9F9F9",
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: width * 0.037, // ~14px
    marginBottom: height * 0.033, // ~25px
    marginHorizontal: width * 0.064, // ~24px
  },
  phoneNumberimg: {
    width: width * 0.064, // ~24px
    height: width * 0.064, // ~24px
    marginRight: width * 0.042, // ~16px
  },
  textInputPhoneNumber: {
    color: "#A7AEC1",
    fontSize: width * 0.037, // ~14px
    flex: 1,
    paddingVertical: height * 0.02, // ~15px
  },
  titlePassword: {
    color: "#191D31",
    fontSize: width * 0.042, // ~16px
    fontWeight: "bold",
    marginBottom: height * 0.013, // ~10px
    marginLeft: width * 0.069, // ~26px
  },
  ViewPassword: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBFBFD",
    borderColor: "#F9F9F9",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: height * 0.02, // ~15px
    paddingHorizontal: width * 0.037, // ~14px
    marginBottom: height * 0.066, // ~50px
    marginHorizontal: width * 0.064, // ~24px
  },
  password: {
    color: "#A7AEC1",
    fontSize: width * 0.037, // ~14px
    flex: 1,
  },
  passwordIGM1: {
    width: width * 0.064, // ~24px
    height: width * 0.064, // ~24px
    marginRight: width * 0.042, // ~16px
  },
  eye: {
    // Không cần flex: 1 ở đây vì nó không ảnh hưởng nhiều
  },
  eyeIMG: {
    width: width * 0.064, // ~24px
    height: width * 0.061, // ~23px
  },
  ClickSignup: {
    alignItems: "center",
    backgroundColor: "#77634C",
    borderRadius: 30,
    paddingVertical: height * 0.03, // ~23px
    marginBottom: height * 0.033, // ~25px
    marginHorizontal: width * 0.064, // ~24px
  },
  textSignup: {
    color: "#FFFFFF",
    fontSize: width * 0.042, // ~16px
    fontWeight: "bold",
  },
  loginQickLy: {
    color: "#A7AEC1",
    fontSize: width * 0.037, // ~14px
    marginBottom: height * 0.025, // ~19px
    textAlign: "center", // Thay marginHorizontal cố định để căn giữa
  },
  signinGG: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#F3F3F3",
    borderRadius: 30,
    borderWidth: 2,
    paddingVertical: height * 0.02, // ~15px
    marginBottom: height * 0.02, // ~15px
    marginHorizontal: width * 0.064, // ~24px
  },
  siginIMG: {
    width: width * 0.082, // ~31px
    height: width * 0.069, // ~26px
    marginRight: width * 0.029, // ~11px
  },
  textSigin: {
    color: "#191D31",
    fontSize: width * 0.042, // ~16px
    fontWeight: "bold",
  },
  siginTikTok: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#F3F3F3",
    borderRadius: 30,
    borderWidth: 2,
    paddingVertical: height * 0.02, // ~15px
    marginBottom: height * 0.082, // ~62px
    marginHorizontal: width * 0.064, // ~24px
  },
  sigintiktokIMG: {
    width: width * 0.077, // ~29px
    height: width * 0.072, // ~27px
    marginRight: width * 0.029, // ~11px
  },
  texttiktokSigin: {
    color: "#191D31",
    fontSize: width * 0.042, // ~16px
    fontWeight: "bold",
  },
});

export default sigupStyle;