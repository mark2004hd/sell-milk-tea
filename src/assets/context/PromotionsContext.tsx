import { LOCAL_IPV4_ADDRESS, PORT } from "@env";
import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
export interface Promotion {
	id: string;
	title: string;
	price: string;
	image: string;
	description: string;
	tag?: string;
	tagColor?: string;
	product?: string;
}

interface PromotionsContextType {
	promotions: Promotion[];
	setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
}

const PromotionsContext = createContext<PromotionsContextType | undefined>(undefined);

export const PromotionsProvider = ({ children }: { children: ReactNode }) => {
	const [promotions, setPromotions] = useState<Promotion[]>([]);

	useEffect(() => {
		const fetchPromotions = async () => {
			try {
				const response = await axios(
					`${LOCAL_IPV4_ADDRESS}:${PORT}/zen8labs-system/api/tea`,
					{
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						// Include body if the API expects data
						// body: JSON.stringify({ /* your payload here */ }),
						
					},
				);
				console.log("URL:", `${LOCAL_IPV4_ADDRESS}:${PORT}/zen8labs-system/api/tea`);


				const data = response.data; // Directly access the response data

				// console.log("Parsed JSON:", data);
				if (data.response === "Success") {
					setPromotions(data.promotion);
				} else {
					console.log("Server responded but not success:", data);
				}
			} catch (error) {
				console.error("Error fetching promotions:", error);
			}
		};

		fetchPromotions();
	}, []);

	return (
		<PromotionsContext.Provider value={{ promotions, setPromotions }}>
			{children}
		</PromotionsContext.Provider>
	);
};

export const usePromotions = () => {
	const context = useContext(PromotionsContext);
	if (!context) {
		throw new Error("usePromotions must be used within a PromotionsProvider");
	}
	return context;
};