import RenderIf from '@app/components/RenderIf';
import Text from '@app/components/Text';
import Section from '@app/components/Section';
import {normalize} from '@app/styles/mixins';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'react-native-appearance';
import {rxUserFontSize} from '@app/services/cache';
import {useReactiveVar} from '@apollo/client';
const Button = ({
  label,
  onPress,
  disabled = false,
  styleProp = {},
  textStyleProp = {},
  loading = false,
  width: widthProp,
}) => {
  const scheme = useColorScheme();

  const userFontSize = useReactiveVar(rxUserFontSize);

  let width = normalize(100);
  if (widthProp) {
    width = widthProp;
  }

  return (
    <Section
      onPress={onPress}
      border
      radius
      width={width * userFontSize}
      centerChildren
      style={[{borderColor: scheme === 'dark' ? '#fff' : '#000'}, styleProp]}
      disabled={disabled}>
      <RenderIf condition={loading}>
        <ActivityIndicator
          style={{
            padding: normalize(5),
          }}
        />
      </RenderIf>
      <RenderIf condition={!loading}>
        <Text center style={[styles.textStyle, textStyleProp]}>
          {label}
        </Text>
      </RenderIf>
    </Section>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    padding: normalize(10),
  },
});

export default Button;
