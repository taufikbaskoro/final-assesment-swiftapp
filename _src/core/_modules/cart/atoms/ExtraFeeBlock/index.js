import React, {useState} from 'react';
import {FlatList, Modal, Text} from 'react-native';
import {TouchableRipple, ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {normalize} from '@app/styles/mixins';

import CheckBox from '@app/components/CheckBox';
import RadioButton from '@app/components/RadioButton';
import CustomView from '@app/components/CustomView';

import styles from '@app/_modules/cart/atoms/ExtraFeeBlock/styles';

/**
 * ---------------------------------------------------- *
 * @profiler {Option Radio Checkbox}
 * @summary return object option radio
 * ---------------------------------------------------- *
 */
const AdditionalOptionRadioCheckbox = withProfiler(
  ({option_id, type, label, price, selected, Component, onPressOption}) => {
    return (
      <TouchableRipple onPress={() => onPressOption(option_id, type)}>
        <CustomView small key={option_id}>
          <CustomView plain row horizontal alignCenter>
            <Component
              selected={selected}
              onPress={() => onPressOption(option_id, type)}
            />
            <Text style={{marginHorizontal: normalize(10)}}>
              {`${label} (${price})`}
            </Text>
          </CustomView>
        </CustomView>
      </TouchableRipple>
    );
  },
  {name: 'AdditionalOptionRadio'},
);

/**
 * ---------------------------------------------------- *
 * @profiler {Option Radio Dropdown}
 * @summary return object option dropdown
 * ---------------------------------------------------- *
 */
const AdditionalOptionDropdown = withProfiler(
  ({options, selectedOptions, setShowModal}) => {
    let labelResult = '';
    options.map(({option_id, label, price}) => {
      if (selectedOptions?.includes(option_id)) {
        labelResult = `${label} (${price})`;
      }
    });
    return (
      <TouchableRipple onPress={() => setShowModal(options)}>
        <CustomView small style={[styles.itemContainer]}>
          <Text>{labelResult || 'Please choose an option'}</Text>
        </CustomView>
      </TouchableRipple>
    );
  },
  {name: 'AdditionalOptionDropdown'},
);

/**
 * ---------------------------------------------------- *
 * @profiler {Option List}
 * @summary return list option
 * ---------------------------------------------------- *
 */
const AddtionalOptionsList = withProfiler(
  ({options, type, selectedOptionExtraFee, onPressOption, setShowModal}) => {
    switch (type) {
      case 'checkbox':
        return options.map(option => {
          return (
            <AdditionalOptionRadioCheckbox
              key={option.option_id}
              option_id={option.option_id}
              type={type}
              label={option.label}
              price={option.price}
              selected={selectedOptionExtraFee?.includes(option.option_id)}
              Component={CheckBox}
              onPressOption={onPressOption}
            />
          );
        });
      case 'radio':
        return options.map(option => {
          return (
            <AdditionalOptionRadioCheckbox
              key={option.option_id}
              option_id={option.option_id}
              type={type}
              label={option.label}
              price={option.price}
              selected={selectedOptionExtraFee?.includes(option.option_id)}
              Component={RadioButton}
              onPressOption={onPressOption}
            />
          );
        });
      default:
        return (
          <AdditionalOptionDropdown
            selectedOptions={selectedOptionExtraFee}
            options={options}
            setShowModal={setShowModal}
          />
        );
    }
  },
  {name: 'AdditionalOptionList'},
);

/**
 * ---------------------------------------------------- *
 * @component {Extra Fee Block}
 * @summary return component Extra Fee Block
 * ---------------------------------------------------- *
 */
const ExtraFeeBlock = ({
  dataFee,
  selectedOptionExtraFee,
  onPressOption,
  extraFeeLoading,
}) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [dropdownList, setDropdownList] = useState();
  const setShowModal = options => {
    setIsShowModal(true);
    setDropdownList(options);
  };
  if (!extraFeeLoading) {
    if (dataFee && dataFee.length > 0) {
      return (
        <CustomView style={styles.extraFeeWrapper}>
          <CustomView>
            <Text style={styles.extraFeeTitleText}>Extra Fee</Text>
          </CustomView>
          <CustomView style={styles.extraFeeContent}>
            {dataFee.map(addFee => {
              if (addFee.enabled) {
                return (
                  <CustomView key={addFee.fee_name}>
                    <Text alignStart>{addFee.fee_name}</Text>
                    <AddtionalOptionsList
                      options={addFee.options}
                      type={addFee.frontend_type}
                      selectedOptionExtraFee={selectedOptionExtraFee}
                      onPressOption={onPressOption}
                      setShowModal={setShowModal}
                    />
                  </CustomView>
                );
              }
            })}
          </CustomView>
          <Modal
            visible={isShowModal}
            transparent
            onRequestClose={() => setIsShowModal(false)}>
            <CustomView backgroundColor={'rgba(0, 0, 0, 0.6)'} flex />
            <CustomView plain>
              <FlatList
                ListHeaderComponent={
                  <CustomView row spaceBetween doubleHorizontal>
                    <CustomView small>
                      <Text>Select Option</Text>
                    </CustomView>
                    <TouchableRipple onPress={() => setIsShowModal(false)}>
                      <CustomView small>
                        <Text xlarge>x</Text>
                      </CustomView>
                    </TouchableRipple>
                  </CustomView>
                }
                style={styles.listContainer}
                data={dropdownList}
                keyExtractor={item => item.option_id.toString()}
                renderItem={({item}) => {
                  return (
                    <TouchableRipple
                      onPress={() => {
                        onPressOption(item.option_id, 'dropdown');
                        setIsShowModal(false);
                      }}>
                      <CustomView style={styles.itemContainer} small>
                        <RadioButton
                          selected={selectedOptionExtraFee?.includes(
                            item.option_id,
                          )}
                        />
                        <CustomView horizontal small>
                          <Text>{`${item.label} (${item.price})`}</Text>
                        </CustomView>
                      </CustomView>
                    </TouchableRipple>
                  );
                }}
              />
            </CustomView>
          </Modal>
        </CustomView>
      );
    } else {
      return null;
    }
  } else {
    return (
      <CustomView doubleHorizontal center row>
        <CustomView borderRadius={8} flex start>
          <Text>Extra Fee</Text>
          <ActivityIndicator />
        </CustomView>
      </CustomView>
    );
  }
};

export default React.memo(withProfiler(ExtraFeeBlock, {name: 'ExtraFeeBlock'}));
