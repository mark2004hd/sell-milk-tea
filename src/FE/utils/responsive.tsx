<TouchableOpacity
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#FFFFFF",
						borderColor: "#F3F3F3",
						borderRadius: 30,
						borderWidth: 1,
						paddingVertical: 15,
						marginBottom: 62,
						marginHorizontal: 24,
					}}
					onPress={() => alert("Pressed!")}>
					<Image
						source={{
							uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/910d3877-3dab-430e-8855-ef8bbcf701e1",
						}}
						resizeMode={"stretch"}
						style={{
							width: 27,
							height: 27,
							marginRight: 11,
						}}
					/>
					<Text
						style={{
							color: "#191D31",
							fontSize: 16,
							fontWeight: "bold",
						}}>
						{"Login using Tiktok"}
					</Text>
				</TouchableOpacity>
				<View
					style={{
						height: 5,
						backgroundColor: "#191D31",
						borderRadius: 100,
						marginHorizontal: 120,
					}}></View>