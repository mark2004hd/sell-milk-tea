import { Audio } from "expo-av";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";

interface AudioContextType {
	playBackgroundMusic: () => Promise<void>;
	stopBackgroundMusic: () => Promise<void>;
	startMusicAfterLogin: () => Promise<void>;
	isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loopCount, setLoopCount] = useState(0); // Đếm số lần lặp
	const maxLoops = 3; // Giới hạn 3 lần lặp

	const playBackgroundMusic = async () => {
		if (isPlaying) {
			return; // Ngăn phát lại nếu đang phát
		}

		try {
			setIsPlaying(true);
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				playsInSilentModeIOS: true,
				staysActiveInBackground: false,
				shouldDuckAndroid: true,
			});

			const { sound: newSound } = await Audio.Sound.createAsync(require("../audio/soundapp.mp3"), {
				shouldPlay: true,
				volume: 0.5,
			});

			setSound(newSound);

			// Xử lý khi nhạc kết thúc
			newSound.setOnPlaybackStatusUpdate(async (status) => {
				if (status.isLoaded && status.didJustFinish) {
					if (loopCount < maxLoops) {
						// Phát lại nếu chưa đạt giới hạn
						setLoopCount((prev) => prev + 1);
						await newSound.replayAsync();
					} else {
						// Dừng và giải phóng sau 3 lần lặp

						await newSound.stopAsync();
						await newSound.unloadAsync();
						setSound(null);
						setIsPlaying(false);
						setLoopCount(0); // Reset loopCount
					}
				}
			});
		} catch (error) {
			setIsPlaying(false);
		}
	};

	const stopBackgroundMusic = async () => {
		if (sound) {
			try {
				await sound.stopAsync();
				await sound.unloadAsync();
			} catch (error) {}
			setSound(null);
			setIsPlaying(false);
			setLoopCount(0); // Reset loopCount khi dừng thủ công
		}
	};

	const startMusicAfterLogin = async () => {
		setIsLoggedIn(true);
		await playBackgroundMusic();
	};

	useEffect(() => {
		const handleAppStateChange = async (nextAppState: string) => {
			console.log("App state changed to:", nextAppState);
			if (nextAppState === "background") {
				await stopBackgroundMusic();
			} else if (nextAppState === "active" && isLoggedIn && !isPlaying) {
				await playBackgroundMusic();
			}
		};

		const subscription = AppState.addEventListener("change", handleAppStateChange);

		return () => {
			subscription.remove();
		};
	}, [sound, isPlaying, isLoggedIn]);

	useEffect(() => {
		return () => {
			stopBackgroundMusic();
		};
	}, []);

	return (
		<AudioContext.Provider
			value={{ playBackgroundMusic, stopBackgroundMusic, startMusicAfterLogin, isPlaying }}>
			{children}
		</AudioContext.Provider>
	);
};

export const useAudio = () => {
	const context = useContext(AudioContext);
	if (!context) {
		throw new Error("useAudio must be used within an AudioProvider");
	}
	return context;
};
