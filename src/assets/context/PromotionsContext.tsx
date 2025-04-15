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
				const response = await axios.get(
					"http://192.168.37.108:8080/api/promotions"
				);
				if (response.data.Response === "True") {
					setPromotions(response.data.Promotion);
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
