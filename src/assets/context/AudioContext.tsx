import { Audio } from "expo-av";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";

// Định nghĩa kiểu dữ liệu cho Context
interface AudioContextType {
  playBackgroundMusic: () => Promise<void>;
  stopBackgroundMusic: () => Promise<void>;
  startMusicAfterLogin: () => Promise<void>;
  isPlaying: boolean;
}

// Tạo context để quản lý âm thanh
const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null); // Lưu trữ đối tượng âm thanh
  const [isPlaying, setIsPlaying] = useState(false); // Kiểm tra xem nhạc có đang phát hay không
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập
  const [loopCount, setLoopCount] = useState(0); // Đếm số lần lặp nhạc
  const maxLoops = 3; // Giới hạn 3 lần lặp

  // Hàm phát nhạc nền
  const playBackgroundMusic = async () => {
    if (isPlaying) {
      return; // Ngăn việc phát lại nếu đang phát
    }

    try {
      setIsPlaying(true); // Đánh dấu trạng thái đang phát
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false, // Ngừng ghi âm khi đang phát
        playsInSilentModeIOS: true, // Cho phép phát nhạc trong chế độ im lặng
        staysActiveInBackground: false, // Ngừng phát nhạc khi app chuyển sang nền
        shouldDuckAndroid: true, // Giảm âm lượng khi có âm thanh khác
      });

      // Tạo đối tượng âm thanh từ file mp3
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../audio/soundapp.mp3"),
        {
          shouldPlay: true, // Bắt đầu phát ngay
          volume: 0.5, // Điều chỉnh âm lượng
        }
      );

      setSound(newSound);

      // Xử lý khi nhạc kết thúc
      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          if (loopCount < maxLoops) {
            // Nếu chưa đạt số lần lặp tối đa, phát lại nhạc
            setLoopCount((prev) => prev + 1);
            await newSound.replayAsync();
          } else {
            // Nếu đã đạt số lần lặp tối đa, dừng và giải phóng tài nguyên
            await newSound.stopAsync();
            await newSound.unloadAsync();
            setSound(null);
            setIsPlaying(false); // Dừng trạng thái phát nhạc
            setLoopCount(0); // Đặt lại số lần lặp
          }
        }
      });
    } catch (error) {
      setIsPlaying(false); // Nếu có lỗi, dừng phát nhạc
    }
  };

  // Hàm dừng nhạc nền
  const stopBackgroundMusic = async () => {
    if (sound) {
      try {
        await sound.stopAsync(); // Dừng phát nhạc
        await sound.unloadAsync(); // Giải phóng tài nguyên âm thanh
      } catch (error) {}
      setSound(null);
      setIsPlaying(false);
      setLoopCount(0); // Đặt lại số lần lặp khi dừng nhạc
    }
  };

  // Hàm bắt đầu phát nhạc sau khi người dùng đăng nhập
  const startMusicAfterLogin = async () => {
    setIsLoggedIn(true); // Đánh dấu trạng thái đã đăng nhập
    await playBackgroundMusic(); // Phát nhạc ngay sau khi đăng nhập thành công
  };

  // Lắng nghe sự thay đổi trạng thái của app (background / active)
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      console.log("App state changed to:", nextAppState);
      if (nextAppState === "background") {
        await stopBackgroundMusic(); // Dừng nhạc khi app chuyển sang nền
      } else if (nextAppState === "active" && isLoggedIn && !isPlaying) {
        await playBackgroundMusic(); // Tiếp tục phát nhạc khi app quay lại từ nền
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove(); // Xóa subscription khi component unmount
    };
  }, [sound, isPlaying, isLoggedIn]);

  // Dọn dẹp khi component unmount
  useEffect(() => {
    return () => {
      stopBackgroundMusic(); // Dừng nhạc khi component unmount
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        playBackgroundMusic,
        stopBackgroundMusic,
        startMusicAfterLogin,
        isPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

// Hook sử dụng context âm thanh
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
