import Text from '@app/components/Text';
import {normalize} from '@app/styles/mixins';
import {Colors} from '@app/styles';

import React, {useCallback, useState} from 'react';
import {Dimensions, Platform, StyleSheet, TextInput, View} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import RNInfo from 'react-native-device-info';

const Input = ({
  placeholder,
  value,
  styleProp = {},
  textStyleProp = {},
  onChangeText = null,
  secureTextEntry = false,
  editable = true,
  keyboardType,
  label = '',
  error = '',
  placeholderTextColor,
  onFocus,
  autoFocus,
  multiline = false,
  numberOfLines = 1,
  caretHidden,
}) => {
  const {Version} = Platform;

  const scheme = useColorScheme();

  const brandsNeedingWorkaround = ['redmi', 'xiaomi', 'poco', 'pocophone'];
  const needsXiaomiWorkaround =
    brandsNeedingWorkaround.includes(RNInfo.getBrand().toLowerCase()) &&
    Version > 28;

  const [hackCaretHidden, setHackCaretHidden] = useState(
    needsXiaomiWorkaround ? true : false,
  );

  const handleFocus = useCallback(() => {
    if (needsXiaomiWorkaround) {
      setHackCaretHidden(true);
    }
    if (onFocus) {
      onFocus();
    }
  }, [onFocus, caretHidden]);

  return (
    <View
      style={[
        styles.mainContainer,
        {borderColor: scheme === 'dark' ? Colors.WHITE : Colors.BLACK},
        styleProp,
      ]}>
      {error ? (
        <Text small primary>
          {error}
        </Text>
      ) : (
        <Text small>{label}</Text>
      )}
      <TextInput
        value={value}
        style={[
          {color: scheme === 'dark' ? Colors.WHITE : Colors.BLACK},
          styles.inputStyle,
          textStyleProp,
        ]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable}
        keyboardType={keyboardType}
        placeholderTextColor={
          placeholderTextColor
            ? placeholderTextColor
            : scheme === 'dark'
            ? Colors.GRAY_DARK
            : Colors.GRAY_MEDIUM
        }
        onFocus={handleFocus}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
        caretHidden={hackCaretHidden}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical: normalize(5),
    paddingHorizontal: 0,
  },
  mainContainer: {
    borderBottomWidth: 1,
    width: Dimensions.get('screen').width * 0.8,
    marginBottom: normalize(15),
  },
});

export default Input;
