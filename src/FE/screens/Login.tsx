import React, { useState } from "react";

import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		if (username === "admin" && password === "adminpass") {
			Alert.alert("Login Successful", `Welcome, ${username}!`);
		} else {
			Alert.alert("Login Failed", "Invalid username or password.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>

			<TextInput
				style={styles.input}
				placeholder="Enter your username"
				value={username}
				onChangeText={setUsername}
			/>

			<TextInput
				style={styles.input}
				placeholder="Enter your password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			<Button title="Login" onPress={handleLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	input: {
		width: "70%",
		height: 70,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
	},
});

export default Login;
