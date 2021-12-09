import React from 'react';
import {withProfiler} from '@sentry/react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import AppBarComponent from '@app/components/AppBar';
import Forms from '@app/components/_Forms/index';
import {formSchema} from '@app/_modules/account_add_address/forms';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PinPoint from '@app/components/PinPoint';
import {FORM_FIELD} from '@app/helpers/Constants';
import styles from '@app/_modules/account_add_address/styles';
import _ from 'lodash';

const buttonPinPoint = ({onModalOpen, selectedLocation}) => {
  const hasBeenSet = _.get(selectedLocation, 'pinpoint.longitude') !== '0';
  return (
    <Button
      icon={'map-marker-plus'}
      color={hasBeenSet && 'green'}
      mode={'outlined'}
      onPress={() => onModalOpen('pinpoint')}
      style={styles.button}>
      {hasBeenSet ? 'Location Selected' : 'Add pin point'}
    </Button>
  );
};
const Views = ({
  isEdit,
  onModalOpen,
  onModalClose,
  modalLocation,
  onSetPinPoint,
  onSelectLocation,
  countryList,
  regionList,
  cityList,
  subdistrictList,
  villageList,
  selectedLocation,
  onSaveAddress,
  loading,
}) => {
  const forms = formSchema({
    custom: [
      {
        name: 'country',
        label: 'Country',
        textContentType: 'address',
        type: FORM_FIELD.INPUT_DROPDOWN,
        onPress: onSelectLocation,
        isVisible: true,
        data: countryList,
        defaultValue: isEdit ? 'Indonesia' : '',
        autoCapitalized: 'none',
        rules: {required: 'Required'},
      },
      {
        name: 'region',
        label: 'Province',
        textContentType: 'address',
        type: FORM_FIELD.INPUT_DROPDOWN,
        isVisible: regionList.length > 0,
        onPress: onSelectLocation,
        data: regionList,
        defaultValue: '',
        autoCapitalized: 'none',
        rules: {required: 'Required'},
      },
      {
        name: 'district',
        label: 'District/Kabupaten',
        textContentType: 'address',
        type: FORM_FIELD.INPUT_DROPDOWN,
        isVisible: cityList.length > 0,
        onPress: onSelectLocation,
        data: cityList,
        defaultValue: '',
        autoCapitalized: 'none',
        rules: {required: 'Required'},
      },
      {
        name: 'subdistrict',
        label: 'Subdistrict/Kecamatan',
        textContentType: 'address',
        type: FORM_FIELD.INPUT_DROPDOWN,
        isVisible: subdistrictList.length > 0,
        onPress: onSelectLocation,
        data: subdistrictList,
        defaultValue: '',
        autoCapitalized: 'none',
        rules: {required: 'Required'},
      },
      {
        name: 'urbanVillage',
        label: 'Urban Village/Kelurahan',
        textContentType: 'address',
        type: FORM_FIELD.INPUT_DROPDOWN,
        isVisible: villageList.length > 0,
        onPress: onSelectLocation,
        data: villageList,
        defaultValue: '',
        autoCapitalized: 'none',
        rules: {required: 'Required'},
      },
      {
        name: 'streetAddress',
        label: 'Street Address',
        textContentType: 'address',
        type: FORM_FIELD.INPUT,
        defaultValue: isEdit ? isEdit.street : '',
        autoCapitalized: 'words',
        rules: {required: 'Required'},
      },
      {
        name: 'postalCode',
        label: 'Postal Code',
        textContentType: 'address',
        type: FORM_FIELD.INPUT,
        defaultValue: isEdit ? isEdit.postcode : '',
        autoCapitalized: 'none',
        rules: {required: 'Required'},
      },
      {
        name: 'buttonPinpoint',
        type: FORM_FIELD.CUSTOM,
        renderItem: buttonPinPoint({onModalOpen, selectedLocation}),
      },
    ],
    defVal: isEdit,
  });

  return (
    <SafeAreaView>
      <AppBarComponent
        title={isEdit ? 'Edit Address' : 'Add address'}
        useBack
      />
      <KeyboardAwareScrollView nestedScrollEnabled>
        <Forms
          fields={forms}
          buttonTitle={'Submit'}
          onSubmit={onSaveAddress}
          loading={loading}
        />
      </KeyboardAwareScrollView>
      <PinPoint
        title="Search Location..."
        visible={modalLocation.pinpoint}
        dataLocation={''}
        onSelectItem={onSetPinPoint}
        onBackBackButtonPress={() => onModalClose('pinpoint')}
      />
    </SafeAreaView>
  );
};

export default withProfiler(Views, {name: 'AddAddressView'});
