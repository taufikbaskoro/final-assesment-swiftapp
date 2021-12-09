import {Dimensions, Platform} from 'react-native';
import Normalize from 'react-native-normalize';
/**
 * ---------------------------------------------------- *
 * @constant variables
 * @summary this all variables
 * for styling purpose
 * ---------------------------------------------------- *
 */
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const MAX_WIDTH = Dimensions.get('window').width;
export const MAX_HEIGHT = Dimensions.get('window').height;
export const BREAK_POINT = {
  LDPI: 320 /* 0.75 */,
  MDPI: 480 /* 1.0 */,
  HDPI: 720 /* 1.5 */,
  XHDPI: 960 /* 2.0 */,
  XXHDPI: 1440 /* 3.0 */,
  XXXHDPI: 1920 /* 4.0 */,
};

/**
 * ---------------------------------------------------- *
 * @function padding
 * @param {*} props
 * @return {object}
 * ---------------------------------------------------- *
 */
export const padding = props => {
  let isParamsOne = typeof props === 'number';
  if (isParamsOne) {
    return {
      paddingTop: props,
      paddingBottom: props,
      paddingRight: props,
      paddingLeft: props,
    };
  } else {
    let value = {};
    if (props.top !== undefined) {
      value = {...value, paddingTop: props.top};
    }
    if (props.bottom !== undefined) {
      value = {...value, paddingBottom: props.bottom};
    }
    if (props.right !== undefined) {
      value = {...value, paddingRight: props.right};
    }
    if (props.left !== undefined) {
      value = {...value, paddingLeft: props.left};
    }

    return value;
  }
};

/**
 * ---------------------------------------------------- *
 * @function margin
 * @param {*} props
 * @return {object}
 * ---------------------------------------------------- *
 */
export const margin = props => {
  let isParamsOne = typeof props === 'number';
  if (isParamsOne) {
    return {
      marginTop: props,
      marginBottom: props,
      marginRight: props,
      marginLeft: props,
    };
  } else {
    let value = {};
    if (props.top !== undefined) {
      value = {...value, marginTop: props.top};
    }
    if (props.bottom !== undefined) {
      value = {...value, marginBottom: props.bottom};
    }
    if (props.right !== undefined) {
      value = {...value, marginRight: props.right};
    }
    if (props.left !== undefined) {
      value = {...value, marginLeft: props.left};
    }

    return value;
  }
};

/**
 * ---------------------------------------------------- *
 * @function position
 * @param {*} props
 * @return {object}
 * ---------------------------------------------------- *
 */
export const position = props => {
  let isParamsOne = typeof props === 'number';
  if (isParamsOne) {
    return {
      top: props,
      bottom: props,
      right: props,
      left: props,
    };
  } else {
    let value = {};
    if (props.top !== undefined) {
      value = {...value, top: props.top};
    }
    if (props.bottom !== undefined) {
      value = {...value, bottom: props.bottom};
    }
    if (props.right !== undefined) {
      value = {...value, right: props.right};
    }
    if (props.left !== undefined) {
      value = {...value, left: props.left};
    }

    return value;
  }
};

/**
 * ---------------------------------------------------- *
 * @function borderRadius
 * @param {*} props
 * @return {object}
 * ---------------------------------------------------- *
 */
export const borderRadius = props => {
  let isParamsOne = typeof props === 'number';
  if (isParamsOne) {
    return {borderRadius: props};
  } else {
    let value = {};
    if (props.topLeft !== undefined) {
      value = {...value, borderTopLeftRadius: props.topLeft};
    }
    if (props.topRight !== undefined) {
      value = {...value, borderTopRightRadius: props.topRight};
    }
    if (props.bottomLeft !== undefined) {
      value = {...value, borderBottomLeftRadius: props.bottomLeft};
    }
    if (props.bottomRight !== undefined) {
      value = {...value, borderBottomRightRadius: props.bottomRight};
    }

    return value;
  }
};

/**
 * ---------------------------------------------------- *
 * @function center
 * @param {*} props
 * @return {object}
 * ---------------------------------------------------- *
 */
export const center = props => {
  if (props === 'self') {
    return {alignSelf: 'center'};
  } else {
    return {
      justifyContent: 'center',
      alignItems: 'center',
    };
  }
};

/**
 * ---------------------------------------------------- *
 * @function fontSize
 * @param {*} props
 * @return {object}
 * ---------------------------------------------------- *
 */
export const fontSize = props => {
  return {fontSize: props};
};

/**
 * ---------------------------------------------------- *
 * @function normalize
 * @param {number} size
 * @return {number}
 * ---------------------------------------------------- *
 */
export const normalize = size => {
  return Normalize(size);
};

/**
 * ---------------------------------------------------- *
 * @function scaleSize
 * @param {number} size
 * @return {number}
 * ---------------------------------------------------- *
 */
const guidelineBaseWidth = 375;
export const scaleSize = size => (MAX_WIDTH / guidelineBaseWidth) * size;

/**
 * ---------------------------------------------------- *
 * @function scaleFont
 * @param {number} size
 * @return {number}
 * ---------------------------------------------------- *
 */
export const scaleFont = size => size * 1;

/**
 * ---------------------------------------------------- *
 * @function boxShadow
 * @param {string} color
 * @param {number} elevation
 * @param {double} radius
 * @param {double} opacity
 * @param {height, width} offset
 * @return {object} shadow
 * ---------------------------------------------------- *
 */
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
