import {Dimensions, Platform} from 'react-native';
import Normalize from 'react-native-normalize';

const getDimension = Dimensions.get('window');
const guidelineBaseWidth = 375;
const dimensions = (top, right = top, bottom = top, left = right, property) => {
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
};

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 0;

export const MAX_WIDTH = getDimension.width;
export const MAX_HEIGHT = getDimension.height;
export const scaleSize = size => (MAX_WIDTH / guidelineBaseWidth) * size;
// export const scaleFont = (size) => size * PixelRatio.getFontScale();
export const scaleFont = size => size * 1;
export const margin = (top, right, bottom, left) => {
  return dimensions(top, right, bottom, left, 'margin');
};
export const padding = (top, right, bottom, left) => {
  return dimensions(top, right, bottom, left, 'padding');
};
export const boxShadow = (
  color,
  elevation = 1,
  radius = 0.5,
  opacity = 0.5,
  offset = {height: 2, width: 2},
) => {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };
};

export const fontSize = size => {
  return {
    fontSize: scaleFont(size),
  };
};

export const border = (color, width = 1) => {
  return {
    borderColor: color,
    borderWidth: width,
  };
};

export const borders = (top, right, bottom, left, color = '#000000') => {
  return {
    borderTopWidth: top,
    borderTopColor: color,
    borderRightWidth: right,
    borderRightColor: color,
    borderBottomWidth: bottom,
    borderBottomColor: color,
    borderLeftWidth: left,
    borderLeftColor: color,
  };
};

export const borderRadius = (topLeft, topRight, bottomLeft, bottomRight) => {
  return {
    borderTopLeftRadius: topLeft,
    borderTopRightRadius: topRight,
    borderBottomLeftRadius: bottomLeft,
    borderBottomRightRadius: bottomRight,
  };
};

export const imageActualSize = (width, height) => {
  return {
    width: width,
    height: height,
  };
};

export const avoidNavbar = () => {
  return {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
  };
};

export const wp = percentage => {
  const value = (percentage * MAX_WIDTH) / 100;
  return Math.round(value);
};

export const center = () => {
  return {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };
};

export const normalize = size => {
  return Normalize(size);
};
