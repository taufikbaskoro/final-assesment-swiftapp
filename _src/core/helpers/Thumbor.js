import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const thumborProductList = url => {
  const widthImage = Math.round(width * 0.7);
  const heightImage = Math.round(height * 0.5);
  const imageSize = `${widthImage}x${heightImage}`;

  const thumborURL = `https://thumbor.sirclocdn.com/unsafe/${imageSize}/filters:format(webp)/`;
  const image = thumborURL + url;

  return image;
};
