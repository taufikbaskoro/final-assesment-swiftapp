import React from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Controller} from 'react-hook-form';
import {Button, Caption} from 'react-native-paper';
import {FORM_FIELD} from '@app/helpers/Constants';

import PropTypes from 'prop-types';
import InputField from '@app/components/InputField/index';
import CheckBox from '@app/components/CheckBox';
import styles from '@app/components/_Forms/styles';

/**
 * @component LabeledCheckbox - override CheckBox to add label after it
 * @param {Boolean} value - state of the checkbox
 * @param {Function} onChange - function for the onClick Checkbox
 * @param {Object} error - use to render error border on Checkbox
 * @param {String} label - use for label Checkbox
 * @param {Boolean} isLast - use to determine marginBottom of the Checkbox
 * @summary Only use in the Forms
 * @returns Component
 */
const LabeledCheckbox = ({value, onChange, error, label, isLast}) => {
  return (
    <View style={isLast ? styles.containerCheckBottom : styles.containerCheck}>
      <CheckBox
        uncheckedColor={error?.message && 'red'}
        onPress={() => onChange(!value)}
        size={20}
        selected={value}
      />
      <Caption style={styles.label}>{label}</Caption>
    </View>
  );
};

/**
 * @component FormComponent
 * @param {Object} FormComponent.propTypes - defined using PropTypes
 * @summary Use to render formschema into component
 * @returns Components
 */

const FormComponent = ({fields, onSubmit, onError, loading, buttonTitle}) => {
  const {control, handleSubmit} = useForm({
    mode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
  });

  const submitEvent = data => onSubmit(data);
  const errorEvent = errors => onError(errors);

  return (
    <View style={styles.container}>
      {fields.map((item, index) =>
        item.type === FORM_FIELD.CUSTOM ? (
          item.renderItem
        ) : (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            defaultValue={item.defaultValue}
            rules={item.rules}
            render={({
              field: {onChange, onBlur, value, ref},
              fieldState: {error},
              formState: {isSubmitting},
            }) => {
              if (item.type === FORM_FIELD.CHECKBOX) {
                return (
                  <LabeledCheckbox
                    isLast={fields.length === index + 1}
                    value={value}
                    onChange={onChange}
                    error={error}
                    label={item.label}
                  />
                );
              }
              if (item.type === FORM_FIELD.INPUT) {
                return (
                  <InputField
                    key={`form-fields-${item.name}-${index}`}
                    loading={loading}
                    isLast={fields.length === index + 1}
                    control={control}
                    defaultValue={item.defaultValue}
                    rules={item.rules}
                    type={item.type}
                    name={item.name}
                    label={item.label}
                    affixLabel={item.affixLabel}
                    isPassword={item.isPassword}
                    autoCapitalized={item.autoCapitalized}
                    textContentType={item.textContentType}
                    keyboardType={item.keyboardType}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error}
                    isSubmitting={isSubmitting}
                    ref={ref}
                  />
                );
              }
              if (item.type === FORM_FIELD.INPUT_DROPDOWN) {
                return (
                  <View>
                    {item.isVisible && (
                      <InputField
                        key={`form-fields-${item.name}-${index}`}
                        isLast={fields.length === index + 1}
                        control={control}
                        data={item.data}
                        onPress={item.onPress}
                        defaultValue={item.defaultValue}
                        rules={item.rules}
                        type={item.type}
                        name={item.name}
                        label={item.label}
                        affixLabel={item.affixLabel}
                        isPassword={item.isPassword}
                        autoCapitalized={item.autoCapitalized}
                        textContentType={item.textContentType}
                        keyboardType={item.keyboardType}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={error}
                        isSubmitting={isSubmitting}
                        ref={ref}
                      />
                    )}
                  </View>
                );
              }
            }}
          />
        ),
      )}
      <Button
        style={styles.button}
        disabled={loading}
        mode={'contained'}
        onPress={handleSubmit(submitEvent, errorEvent)}>
        {buttonTitle}
      </Button>
    </View>
  );
};

FormComponent.propTypes = {
  // use as schema to render form fields
  fields: PropTypes.array.isRequired,
  // use as a callback function for submit button
  onSubmit: PropTypes.func.isRequired,
  // use as a callback function for error from useForm
  onError: PropTypes.func,
  // use as loader state for submit button
  loading: PropTypes.bool,
  // use for button submit title
  buttonTitle: PropTypes.string,
};

export default FormComponent;
