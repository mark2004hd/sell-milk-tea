import { Dimensions, PixelRatio } from 'react-native';

// Get the screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 11's scale
const scale = SCREEN_WIDTH / 375;

export function normalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;