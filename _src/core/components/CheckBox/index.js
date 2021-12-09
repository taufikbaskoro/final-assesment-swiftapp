import Section from '@app/components/Section';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Mixins} from '@app/styles';

const RadioButton = ({
  style,
  onPress,
  selected,
  radius = 3,
  size = 13,
  uncheckedColor: uncheckedColorProp,
  checkedColor: checkedColorProp,
}) => {
  const scheme = useColorScheme();

  let uncheckedColor;
  if (uncheckedColorProp) {
    uncheckedColor = uncheckedColorProp;
  } else {
    uncheckedColor = scheme === 'dark' ? Colors.WHITE : Colors.BLACK;
  }

  let checkedColor;
  if (checkedColorProp) {
    checkedColor = checkedColorProp;
  } else {
    checkedColor = scheme === 'dark' ? Colors.WHITE : Colors.BLACK;
  }

  const sizeStyle = {
    height: size,
    width: size,
    borderRadius: radius,
  };

  const backgroundColor = {
    backgroundColor: checkedColor,
  };

  const borderColor = {
    borderColor: selected ? checkedColor : uncheckedColor,
  };

  const renderChecbox = () => {
    return (
      <Section style={[backgroundColor, sizeStyle, styles.centerOfContent]}>
        <Icon
          name={'ios-checkmark'}
          size={Platform.OS === 'ios' ? 15 : 18}
          color={scheme === 'dark' ? Colors.BLACK : Colors.WHITE}
        />
      </Section>
    );
  };

  return (
    <Section
      onPress={onPress}
      style={[
        borderColor,
        sizeStyle,
        styles.container,
        styles.centerOfContent,
        style,
      ]}>
      {selected ? renderChecbox() : null}
    </Section>
  );
};

const styles = StyleSheet.create({
  centerOfContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    borderWidth: 0.5,
    ...Mixins.margin(5, 0, 5, 0),
  },
});

export default RadioButton;
