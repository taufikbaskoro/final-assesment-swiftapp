import {useReactiveVar} from '@apollo/client';
import React from 'react';
import {Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {rxUserFontSize} from '@app/services/cache';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const CustomText = ({
  children,
  style,
  color: colorProp,

  // size
  xxsmall,
  xsmall,
  small,
  large,
  xlarge,
  scaling = true,

  // weight
  bold,
  light,

  // color
  primary,
  white,

  // text alignment
  center,
  justify,
  left,
  right,

  // decoration
  underline,
  lineThrough,

  // align self
  alignStart,
  alignEnd,
  alignCenter,
}) => {
  const scheme = useColorScheme();

  const userFontSize = useReactiveVar(rxUserFontSize);

  let fontSize = normalize(15);
  if (small) {
    fontSize = normalize(13);
  }
  if (xsmall) {
    fontSize = normalize(10);
  }
  if (xxsmall) {
    fontSize = normalize(8);
  }
  if (large) {
    fontSize = normalize(17);
  }
  if (xlarge) {
    fontSize = normalize(18);
  }
  if (scaling) {
    fontSize *= userFontSize;
  }

  let fontWeight = 'normal';
  if (bold) {
    fontWeight = 'bold';
  }
  if (light) {
    fontWeight = '100';
  }

  // let color = Colors.BLACK;
  let color = scheme === 'dark' ? Colors.WHITE : Colors.BLACK;
  if (primary) {
    color = Colors.PRIMARY;
  }
  if (white) {
    color = Colors.WHITE;
  }
  if (colorProp) {
    color = colorProp;
  }
  // if (white) color = scheme === 'dark' ? Colors.BLACK : Colors.WHITE;

  let textAlign = 'auto';
  if (center) {
    textAlign = 'center';
  }
  if (justify) {
    textAlign = 'justify';
  }
  if (left) {
    textAlign = 'left';
  }
  if (right) {
    textAlign = 'right';
  }

  let textDecorationLine = 'none';
  if (underline) {
    textDecorationLine = 'underline';
  }
  if (lineThrough) {
    textDecorationLine = 'line-through';
  }

  let alignSelf = 'auto';
  if (alignCenter) {
    alignSelf = 'center';
  }
  if (alignStart) {
    alignSelf = 'flex-start';
  }
  if (alignEnd) {
    alignSelf = 'flex-end';
  }

  return (
    <Text
      style={[
        {
          fontSize,
          fontWeight,
          color,
          textAlign,
          textDecorationLine,
          alignSelf,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default CustomText;
