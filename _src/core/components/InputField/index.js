import React, {forwardRef, useMemo, useState} from 'react';
import {View, FlatList} from 'react-native';
import {
  TextInput,
  HelperText,
  TouchableRipple,
  Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from '@app/components/InputField/style';

/**
 * @component InputField
 * @param {Object} ref - to be forwarded to the component
 * @param {Object} InputFieldComponent.propTypes - defined using PropTypes
 * @summary Input field component based on react-native-paper
 * @returns Component
 */

const InputFieldComponent = forwardRef(
  (
    {
      isLast,
      label,
      defaultValue,
      affixLabel,
      autoCapitalized = 'none',
      isPassword = false,
      textContentType = 'none',
      keyboardType = 'default',
      multiline = false,
      editable = true,
      onChange,
      onBlur,
      value,
      error,
      loading,
      isSubmitting,
      data,
      onPress,
      name,
    },
    ref,
  ) => {
    const theme = useTheme();
    const {primary, accent, background} = _.get(theme, 'colors');
    const [passVisibility, setPassVisibility] = useState(false);
    const [showList, setShowList] = useState(false);

    const dataList = useMemo(() => {
      if (data && data.length > 0) {
        return _.filter(data, item =>
          _.includes(_.toLower(item.name), _.toLower(value)),
        );
      }
      return data;
    }, [value]);

    const customOnChange = text => {
      setShowList(true);
      onChange(text);
    };

    const containerStyle = isLast ? styles.bottomContainer : styles.container;

    return (
      <View style={containerStyle}>
        <TextInput
          ref={ref}
          mode={'outlined'}
          label={label}
          editable={editable}
          disabled={isSubmitting || loading}
          secureTextEntry={isPassword && !passVisibility}
          error={error && error.message}
          onChangeText={!data ? onChange : customOnChange}
          onBlur={!data && onBlur}
          autoCapitalize={autoCapitalized}
          defaultValue={defaultValue}
          value={value}
          multiline={multiline}
          returnKeyType={isLast ? 'done' : 'next'}
          textContentType={textContentType}
          keyboardType={keyboardType}
          left={affixLabel && <TextInput.Affix text={affixLabel} />}
          right={
            isPassword && (
              <TextInput.Icon
                onPress={() => setPassVisibility(!passVisibility)}
                name={() => (
                  <Icon
                    color={primary}
                    name={passVisibility ? 'eye-off' : 'eye'}
                    size={20}
                  />
                )}
              />
            )
          }
        />
        {showList && (
          <FlatList
            nestedScrollEnabled
            data={dataList}
            keyExtractor={item => item.name}
            style={[
              styles.listContainer,
              {
                backgroundColor: primary,
              },
            ]}
            renderItem={({item}) => (
              <TouchableRipple
                borderless
                rippleColor={background}
                style={{
                  padding: 10,
                }}
                onPress={() => {
                  onChange(item.name);
                  setShowList(false);
                  onPress({selected: item, fieldName: name});
                }}>
                <Caption style={{color: accent}}>{item.name}</Caption>
              </TouchableRipple>
            )}
          />
        )}
        {error && error.message && (
          <HelperText type="error" visible={error && error.message}>
            {error && error.message}
          </HelperText>
        )}
      </View>
    );
  },
);

InputFieldComponent.propTypes = {
  // use to determined marginBottom
  isLast: PropTypes.bool,
  // use as the input label
  label: PropTypes.string.isRequired,
  // use as defaultValue
  defaultValue: PropTypes.string,
  // use to determined whether to show affix component or not
  affixLabel: PropTypes.string,
  //use as capitalized format for the input
  autoCapitalized: PropTypes.string,
  // use to determined whether to enable secureTextEntry and Visibility Password Component
  isPassword: PropTypes.bool,
  // use tas text content type of the Input
  textContentType: PropTypes.string,
  // use as keyboard type of the Input
  keyboardType: PropTypes.string,
  // use whether multiline enable or not
  multiline: PropTypes.bool,
  // use as callback function for onChange event
  onChange: PropTypes.func.isRequired,
  // use as callback function fot onBlur event
  onBlur: PropTypes.func.isRequired,
  // use as value of the input
  value: PropTypes.string.isRequired,
  //use to show error message
  error: PropTypes.object,
  //use for disabling input on submit
  isSubmitting: PropTypes.bool,
  //state for editable props
  editable: PropTypes.bool,
  // data list for dropdown input
  data: PropTypes.array,
  //onPress callback on selected item for dropdown input
  onPress: PropTypes.func,
  //name from the controller
  name: PropTypes.string,
};

export default InputFieldComponent;
