import Button from '@app/components/Button';
import CheckBox from '@app/components/CheckBox';
import Input from '@app/components/Input';
import Loader from '@app/components/Loader';
import NavBar from '@app/components/NavBar';
import Section from '@app/components/Section';
import Text from '@app/components/Text';
import RenderIf from '@app/components/RenderIf';
import {normalize} from '@app/styles/mixins';

import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {withProfiler} from '@sentry/react-native';

import LocationModal from '@app/components/LocationModal';
import PinPoint from '@app/components/PinPoint';
import styles from '@app/components/AddressForm/styles';

const AddressFormView = ({
  loading = false,
  formError = {},

  firstName = '',
  onSetFirstname,
  lastName = '',
  onSetLastName,
  street = '',
  onSetStreet,
  regionName = '',
  postCode = '',
  onSetPostCode,
  telephone = '',
  onSetTelephone,
  defaultBilling = false,
  onSetDefaultBilling,
  defaultShipping = false,
  onSetDefaultShipping,
  onSaveAddress,

  countryModal,
  regionModal,
  pinPointModal,
  countryList,
  regionList,
  countryName,
  location,
  onSelectLocation,

  onOpenCountryModal,
  onSelectCountry,
  setCountryModal,
  onOpenRegionModal,
  onSelectRegion,
  setRegionModal,
  onOpenPinPointModal,
  setPinPointModal,

  //
  selectedKabupaten,
  kabupatenModal,
  kabupatenList = [],
  onSelectKabupaten,
  setKabupatenModal,
  onOpenKabupatenModal,
  //
  selectedKecamatan,
  kecamatanModal,
  kecamatanList = [],
  onSelectKecamatan,
  setKecamatanModal,
  onOpenKecamatanModal,
  //
  selectedKelurahan,
  kelurahanModal,
  kelurahanList = [],
  onSelectKelurahan,
  setKelurahanModal,
  onOpenKelurahanModal,
}) => {
  const {t} = useTranslation();

  return (
    <Section centerChildren flex>
      <NavBar title="Address Information" />
      <Loader loading={loading} />
      <ScrollView style={styles.subContainer}>
        <Input
          label="First Name"
          placeholder={t('textPlaceholder.firstName')}
          value={firstName}
          onChangeText={onSetFirstname}
        />
        <Input
          label="Last Name"
          placeholder={t('textPlaceholder.lastName')}
          value={lastName}
          onChangeText={onSetLastName}
        />
        <Input
          label="Street Address"
          placeholder={t('textPlaceholder.address')}
          value={street}
          onChangeText={onSetStreet}
        />
        <Section onPress={onOpenCountryModal}>
          <Input
            value={countryName}
            label="Country"
            placeholder={t('textPlaceholder.country')}
            editable={false}
          />
        </Section>
        <Section onPress={onOpenRegionModal}>
          <Input
            value={regionName}
            label="State/Province"
            placeholder={t('textPlaceholder.state')}
            editable={false}
          />
        </Section>
        <Section onPress={onOpenKabupatenModal}>
          <Input
            value={selectedKabupaten}
            label="Kabupaten"
            placeholder={t('textPlaceholder.kabupaten')}
            editable={false}
          />
        </Section>
        <RenderIf condition={kecamatanList?.length || selectedKecamatan}>
          <Section onPress={onOpenKecamatanModal}>
            <Input
              value={selectedKecamatan}
              label="Kecamatan"
              placeholder={t('textPlaceholder.kecamatan')}
              editable={false}
            />
          </Section>
        </RenderIf>
        <RenderIf condition={kelurahanList?.length || selectedKelurahan}>
          <Section onPress={onOpenKelurahanModal}>
            <Input
              value={selectedKelurahan}
              label="Kelurahan"
              placeholder={t('textPlaceholder.kelurahan')}
              editable={false}
            />
          </Section>
        </RenderIf>
        <Section centerChildren onPress={onOpenPinPointModal}>
          <Text center underline style={styles.pinPointButtonText}>
            {`${
              location && location.latitude
                ? 'Change Pin Location'
                : 'Add Pint Location'
            }`}
          </Text>
        </Section>
        <Input
          label="Zip/Postal Code"
          placeholder={t('textPlaceholder.zip')}
          value={postCode}
          onChangeText={onSetPostCode}
          error={formError.postCode}
          keyboardType="number-pad"
        />
        <Input
          label="Mobile Phone"
          placeholder={t('textPlaceholder.phone')}
          value={telephone}
          onChangeText={onSetTelephone}
          error={formError.phone}
          keyboardType="phone-pad"
        />

        <Section row>
          <Section
            onPress={onSetDefaultBilling}
            style={styles.defaultAddressSubContainer}>
            <CheckBox selected={defaultBilling} />
            <Text style={styles.defaultAddressText}>
              Use as my default billing address
            </Text>
          </Section>
        </Section>
        <Section row>
          <Section
            onPress={onSetDefaultShipping}
            style={styles.defaultAddressSubContainer}>
            <CheckBox selected={defaultShipping} />
            <Text style={styles.defaultAddressText}>
              Use as my default shipping address
            </Text>
          </Section>
        </Section>

        <Button
          width={normalize(120)}
          label="Save Address"
          onPress={onSaveAddress}
          styleProp={styles.saveAddressButton}
        />
      </ScrollView>

      <LocationModal
        title="Country"
        visible={countryModal}
        list={countryList}
        onSelectItem={onSelectCountry}
        onBackBackButtonPress={() => setCountryModal(false)}
      />
      <LocationModal
        title="Region"
        visible={regionModal}
        list={regionList}
        onSelectItem={onSelectRegion}
        onBackBackButtonPress={() => setRegionModal(false)}
      />
      <LocationModal
        title="Kabupaten"
        visible={kabupatenModal}
        list={kabupatenList}
        onSelectItem={onSelectKabupaten}
        onBackBackButtonPress={() => setKabupatenModal(false)}
      />
      <LocationModal
        title="Kecamatan"
        visible={kecamatanModal}
        list={kecamatanList}
        onSelectItem={onSelectKecamatan}
        onBackBackButtonPress={() => setKecamatanModal(false)}
      />
      <LocationModal
        title="Kelurahan"
        visible={kelurahanModal}
        list={kelurahanList}
        onSelectItem={onSelectKelurahan}
        onBackBackButtonPress={() => setKelurahanModal(false)}
      />
      <PinPoint
        title="Search Location..."
        visible={pinPointModal}
        dataLocation={location}
        onSelectItem={onSelectLocation}
        onBackBackButtonPress={() => setPinPointModal(false)}
      />
    </Section>
  );
};

export default withProfiler(AddressFormView, {name: 'AddressFormView'});
