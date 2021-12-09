import Section from '@app/components/Section';
import React from 'react';
import {View} from 'react-native';
import {Colors} from '@app/styles';
import {useColorScheme} from 'react-native-appearance';

const RadioButton = ({
  style,
  onPress,
  selected,
  size = 16,
  color: colorProp,
  activeColor = null,
}) => {
  const scheme = useColorScheme();

  let color;
  if (colorProp) {
    color = colorProp;
  } else {
    color = scheme === 'dark' ? Colors.WHITE : Colors.BLACK;
  }

  const containerStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
    borderColor: color,
  };

  const radioStyle = {
    height: size / 2,
    width: size / 2,
    borderRadius: 6,
    backgroundColor: activeColor ? activeColor : color,
  };

  return (
    <Section
      onPress={onPress}
      border
      centerChildren
      style={[containerStyle, style]}>
      {selected ? <View style={radioStyle} /> : null}
    </Section>
  );
};

export default RadioButton;
