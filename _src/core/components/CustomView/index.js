import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Spacing} from '@app/styles';

/**
 * ---------------------------------------------------- *
 * @styles {Custom View}
 * @summary return styles Custom View
 * ---------------------------------------------------- *
 */
const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.BASE_MARGIN,
    backgroundColor: 'transparent',
  },
  containerHeader: {
    paddingVertical: Spacing.DOUBLE_BASE_MARGIN,
    backgroundColor: Colors.WHITE,
  },
});

/**
 * ---------------------------------------------------- *
 * @component {Custom View}
 * @summary return component Custom View
 * ---------------------------------------------------- *
 */
const CustomView = ({
  children,
  style,
  header,
  flex,
  small,
  start,
  center,
  end,
  width,
  height,
  plain,
  spaceBetween,
  spaceAround,
  spaceEvenly,
  verticalCenter,
  row,
  column,
  backgroundColor,
  borderRadius,
  horizontal,
  doubleHorizontal,
  doubleVertical,
  underline,
}) => {
  return (
    <View
      style={[
        header ? styles.containerHeader : styles.container,
        style,
        {
          ...(flex ? {flex: 1} : null),
          ...(small ? {paddingVertical: Spacing.SMALL_MARGIN} : null),
          ...(horizontal ? {paddingHorizontal: Spacing.BASE_MARGIN} : null),
          ...(doubleHorizontal
            ? {paddingHorizontal: Spacing.DOUBLE_BASE_MARGIN}
            : null),
          ...(doubleVertical
            ? {paddingVertical: Spacing.DOUBLE_BASE_MARGIN}
            : null),
          ...(width ? {width} : null),
          ...(height ? {height} : null),
          ...(start ? {alignItems: 'flex-start'} : null),
          ...(end ? {alignItems: 'flex-end'} : null),
          ...(center ? {alignItems: 'center'} : null),
          ...(verticalCenter ? {justifyContent: 'center'} : null),
          ...(plain ? {paddingVertical: 0, paddingHorizontal: 0} : null),
          ...(spaceBetween ? {justifyContent: 'space-between'} : null),
          ...(spaceAround ? {justifyContent: 'space-around'} : null),
          ...(spaceEvenly ? {justifyContent: 'space-evenly'} : null),
          ...(row ? {flexDirection: 'row'} : null),
          ...(column ? {flexDirection: 'column'} : null),
          ...(backgroundColor ? {backgroundColor} : null),
          ...(borderRadius
            ? {
                borderRadius,
                borderWidth: 1,
                borderColor: Colors.GRAY_LIGHT,
              }
            : null),
          ...(underline
            ? {borderBottomWidth: 0.2, borderBottomColor: Colors.GRAY_SMOOTH5}
            : null),
        },
      ]}>
      {children}
    </View>
  );
};

export default CustomView;
