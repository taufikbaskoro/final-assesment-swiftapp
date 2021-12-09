import React from 'react';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useColorScheme} from 'react-native-appearance';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rxUserFontSize} from '@app/services/cache';
import {useReactiveVar} from '@apollo/client';

const Section = ({
  key,
  keyIndex,
  children,

  backgroundColor: backgroundColorProp,
  transparent,
  border,
  radius,

  flex: flexProp,
  row,

  alignCenter,
  alignStart,
  alignEnd,

  selfCenter,

  centerChildren,
  spaceBetween,
  spaceAround,
  justifyCenter,

  height: heightProp,
  heightScaling = true,
  width: widthProp,
  widthScaling = false,
  maxWidth,

  margin: marginProp,
  margin2,
  margin3,
  hmargin,
  hmargin2,
  hmargin3,
  vmargin,
  vmargin2,
  vmargin3,
  padding: paddingProp,
  padding2,
  padding3,
  hpadding,
  hpadding2,
  hpadding3,
  vpadding,
  vpadding2,
  vpadding3,

  style: styleProp,

  onPress = null,
  safe = false,
}) => {
  const scheme = useColorScheme();

  const userFontSize = useReactiveVar(rxUserFontSize);

  const size1 = normalize(10);
  const size2 = normalize(20);
  const size3 = normalize(30);

  const setBoxModel = (current, direction, size, type) => {
    if (direction === 'h') {
      return {
        ...current,
        [`${type}Left`]: size,
        [`${type}Right`]: size,
      };
    }

    if (direction === 'v') {
      return {
        ...current,
        [`${type}Top`]: size,
        [`${type}Bottom`]: size,
      };
    }

    return {[`${type}`]: size};
  };

  // let backgroundColor = Colors.WHITE;
  let backgroundColor = scheme === 'dark' ? Colors.BLACK : Colors.WHITE;
  if (backgroundColorProp) {
    backgroundColor = backgroundColorProp;
  }
  if (transparent) {
    backgroundColor = 'transparent';
  }

  let alignItems = 'auto';
  let justifyContent = 'flex-start';
  if (centerChildren) {
    alignItems = 'center';
    justifyContent = 'center';
  }
  if (spaceBetween) {
    justifyContent = 'space-between';
  }
  if (spaceAround) {
    justifyContent = 'space-around';
  }
  if (justifyCenter) {
    justifyContent = 'center';
  }
  if (alignCenter) {
    alignItems = 'center';
  }
  if (alignStart) {
    alignItems = 'flex-start';
  }
  if (alignEnd) {
    alignItems = 'flex-end';
  }

  let alignSelf = 'auto';
  if (selfCenter) {
    alignSelf = 'center';
  }

  let flex = 0;
  if (flexProp) {
    typeof flexProp === 'boolean' ? (flex = 1) : (flex = flexProp);
  }

  let flexDirection = 'column';
  if (row) {
    flexDirection = 'row';
  }

  let height = 'auto';
  if (heightProp) {
    height = heightProp;
    if (heightScaling) {
      height *= userFontSize;
    }
  }

  let width = 'auto';
  if (widthProp) {
    width = widthProp;
    if (widthScaling) {
      width *= userFontSize;
    }
  }
  if (maxWidth) {
    width = Mixins.MAX_WIDTH;
  }

  let borderColor = Colors.WHITE;
  let borderWidth = 0;
  if (border) {
    if (typeof border === 'boolean') {
      borderColor = scheme === 'dark' ? Colors.WHITE : Colors.BLACK;
    } else {
      borderColor = border;
    }
    borderWidth = 1;
  }

  let borderRadius = 0;
  if (radius) {
    typeof radius === 'boolean' ? (borderRadius = 15) : (borderRadius = radius);
  }

  let margin = {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  };
  if (marginProp) {
    typeof marginProp === 'boolean'
      ? (margin = setBoxModel(margin, 'a', size1, 'margin'))
      : (margin = setBoxModel(margin, 'a', marginProp, 'margin'));
  }
  if (margin2) {
    margin = setBoxModel(margin, 'a', size2, 'margin');
  }
  if (margin3) {
    margin = setBoxModel(margin, 'a', size3, 'margin');
  }

  if (hmargin) {
    typeof hmargin === 'boolean'
      ? (margin = setBoxModel(margin, 'h', size1, 'margin'))
      : (margin = setBoxModel(margin, 'h', hmargin, 'margin'));
  }
  if (hmargin2) {
    margin = setBoxModel(margin, 'h', size2, 'margin');
  }
  if (hmargin3) {
    margin = setBoxModel(margin, 'h', size3, 'margin');
  }

  if (vmargin) {
    typeof vmargin === 'boolean'
      ? (margin = setBoxModel(margin, 'v', size1, 'margin'))
      : (margin = setBoxModel(margin, 'v', vmargin, 'margin'));
  }
  if (vmargin2) {
    margin = setBoxModel(margin, 'v', size2, 'margin');
  }
  if (vmargin3) {
    margin = setBoxModel(margin, 'v', size3, 'margin');
  }

  let padding = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };

  if (paddingProp) {
    typeof paddingProp === 'boolean'
      ? (padding = setBoxModel(padding, 'a', size1, 'padding'))
      : (padding = setBoxModel(padding, 'a', paddingProp, 'padding'));
  }
  if (padding2) {
    padding = setBoxModel(padding, 'a', size2, 'padding');
  }
  if (padding3) {
    padding = setBoxModel(padding, 'a', size3, 'padding');
  }

  if (hpadding) {
    typeof hpadding === 'boolean'
      ? (padding = setBoxModel(padding, 'h', size1, 'padding'))
      : (padding = setBoxModel(padding, 'h', hpadding, 'padding'));
  }
  if (hpadding2) {
    padding = setBoxModel(padding, 'h', size2, 'padding');
  }
  if (hpadding3) {
    padding = setBoxModel(padding, 'h', size3, 'padding');
  }

  if (vpadding) {
    typeof vpadding === 'boolean'
      ? (padding = setBoxModel(padding, 'v', size1, 'padding'))
      : (padding = setBoxModel(padding, 'v', vpadding, 'padding'));
  }
  if (vpadding2) {
    padding = setBoxModel(padding, 'v', size2, 'padding');
  }
  if (vpadding3) {
    padding = setBoxModel(padding, 'v', size3, 'padding');
  }

  let style = {};
  let styleMultiple = [{}];
  if (styleProp) {
    if (styleProp.length) {
      styleMultiple = styleProp;
    } else {
      style = styleProp;
    }
  }

  let styleObject = {
    alignItems,
    alignSelf,
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    flex,
    flexDirection,
    justifyContent,
    height,
    width,
  };

  if (
    !styleProp?.padding &&
    !styleProp?.paddingHorizontal &&
    !styleProp?.paddingVertical
  ) {
    styleObject = {...styleObject, ...padding};
  }

  if (
    !styleProp?.margin &&
    !styleProp?.marginHorizontal &&
    !styleProp?.marginVertical
  ) {
    styleObject = {...styleObject, ...margin};
  }

  if (safe) {
    return (
      <SafeAreaView
        key={keyIndex}
        style={[styleObject, style, ...styleMultiple]}>
        {children}
      </SafeAreaView>
    );
  } else if (onPress) {
    return (
      <TouchableRipple
        onPress={onPress}
        key={keyIndex}
        style={[styleObject, style, ...styleMultiple]}>
        <View>{children}</View>
      </TouchableRipple>
    );
  } else {
    return (
      <View key={keyIndex} style={[styleObject, style, ...styleMultiple]}>
        {children}
      </View>
    );
  }
};

export default Section;
