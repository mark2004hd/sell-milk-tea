import { StyleSheet } from "react-native";
const styleIntroduce = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ab9377",
	},
	scollView: {
		flex: 1,
		backgroundColor: "#ceae66",
		paddingTop: 77,
	},
	img: {
		flex: 1,
		width: 327,
		marginHorizontal: 47,
		height: 425,
		color: "#ceae66",
		resizeMode: "contain",
		marginVertical: 43,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
	},
	Header: {
		fontSize: 40,
		fontWeight: "bold",
		color: "#fff",
		marginLeft: "23%",
	},
	Text1: {
		color: "#594329",
		fontSize: 16,
		marginHorizontal: 126,
	},
	coffe: {
		borderRadius: 22,
		backgroundColor: "#77644c",
		width: 44,
		height: 44,
		marginHorizontal: 179,
		marginTop: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	coffeIMG: {
		width: 28,
		height: 28,
		
		
	},
	version: {
		fontSize: 14,
		fontFamily: "Medium",
		fontWeight: "bold",
		color: "#fff",
        textAlign:"center"
	},
});
export default styleIntroduce;
