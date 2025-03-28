import { StyleSheet, Dimensions } from "react-native";

// Lấy chiều rộng màn hình để tính toán margin theo tỷ lệ
const { width } = Dimensions.get("window");

const gif1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Sửa "#black" thành "black"
  },

  img: {
    width: 330,
    height: 394,
    marginLeft: 35,
    marginTop: width * 0.2, // Thay "20%" bằng giá trị tính toán
    resizeMode: "contain",
    borderRadius: 30,
  },

  Header: {
    fontWeight: "bold",
    marginBottom: 40, // Tăng giá trị để tạo khoảng cách hợp lý
  },

  title1: {
    color: "black",
    fontSize: 40,
    marginLeft: width * 0.16,
    marginTop: 20,
  },

  title2: {
    color: "black",
    fontSize: 40,
    marginLeft: width * 0.2,
  },

  sum: {
    marginBottom: 20,
  },

  Text1: { // Quay lại tên Text1
    fontSize: 14,
    color: "#A7AEC1",
    marginLeft: width * 0.2,
  },

  Text2: { // Quay lại tên Text2
    fontSize: 14,
    color: "#A7AEC1",
    marginLeft: width * 0.2,
  },

  Text3: { // Quay lại tên Text3
    fontSize: 14,
    color: "#A7AEC1",
    marginLeft: width * 0.2,
  },
});

export default gif1;