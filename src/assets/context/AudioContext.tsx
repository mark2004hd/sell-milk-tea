import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { AppState } from 'react-native';

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
      console.log('Music is already playing, skipping...');
      return; // Ngăn phát lại nếu đang phát
    }

    try {
      console.log('Attempting to play background music...');
      setIsPlaying(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../audio/soundapp.mp3'),
        { shouldPlay: true, volume: 0.5 }
      );

      console.log('Sound created successfully');
      setSound(newSound);

      // Xử lý khi nhạc kết thúc
      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          console.log(`Music finished, loop count: ${loopCount + 1}`);
          if (loopCount < maxLoops) {
            // Phát lại nếu chưa đạt giới hạn
            setLoopCount((prev) => prev + 1);
            await newSound.replayAsync();
          } else {
            // Dừng và giải phóng sau 3 lần lặp
            console.log('Reached max loops, stopping music...');
            await newSound.stopAsync();
            await newSound.unloadAsync();
            setSound(null);
            setIsPlaying(false);
            setLoopCount(0); // Reset loopCount
          }
        }
      });
    } catch (error) {
      console.error('Failed to play the sound:', error);
      setIsPlaying(false);
    }
  };

  const stopBackgroundMusic = async () => {
    if (sound) {
      try {
        console.log('Stopping background music...');
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch (error) {
        console.error('Failed to stop the sound:', error);
      }
      setSound(null);
      setIsPlaying(false);
      setLoopCount(0); // Reset loopCount khi dừng thủ công
    }
  };

  const startMusicAfterLogin = async () => {
    console.log('Starting music after login...');
    setIsLoggedIn(true);
    await playBackgroundMusic();
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      console.log('App state changed to:', nextAppState);
      if (nextAppState === 'background') {
        await stopBackgroundMusic();
      } else if (nextAppState === 'active' && isLoggedIn && !isPlaying) {
        await playBackgroundMusic();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      console.log('Removing AppState subscription');
      subscription.remove();
    };
  }, [sound, isPlaying, isLoggedIn]);

  useEffect(() => {
    return () => {
      console.log('Cleaning up AudioProvider');
      stopBackgroundMusic();
    };
  }, []);

  return (
    <AudioContext.Provider value={{ playBackgroundMusic, stopBackgroundMusic, startMusicAfterLogin, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};