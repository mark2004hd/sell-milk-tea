import { StyleSheet } from "react-native";
const styleIntroduce = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ab9377",
	},

	img: {
		
		width: 327,
		marginLeft:35,
		height: 425,
		color: "#ceae66",
		resizeMode: "contain",
	    marginTop:"20%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		
	},

	Header: {
		paddingTop:50,
		fontSize: 40,
		fontWeight: "bold",
		color: "#fff",
		marginLeft: "27%",
		marginBottom:"4%"
	},
	Text1: {
		color: "#594329",
		fontSize: 16,
	    marginLeft:"35%"
		
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
