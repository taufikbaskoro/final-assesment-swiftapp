import React, {useEffect, useRef, useState} from 'react';
import {Modal, Platform} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Button, useTheme} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';

import Geolocation from '@react-native-community/geolocation';
import Section from '@app/components/Section';
import MapView from 'react-native-maps';
import SearchGoogleAutocomplete from '@app/components/SearchGoogleAutocomplete';

const RenderMap = withProfiler(
  ({refMarker, location, loader, onRegionChange, mapMargin, setMapMargin}) => {
    if (!loader) {
      return (
        <MapView
          ref={refMarker}
          showsUserLocation
          showsMyLocationButton
          style={[
            {height: '100%', width: '100%', borderRadius: 6},
            {marginBottom: mapMargin},
          ]}
          initialRegion={{
            latitude: Number(location.latitude),
            longitude: Number(location.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={region => onRegionChange(region)}
          provider="google"
          onMapReady={() => {
            if (Platform.OS === 'android') {
              setMapMargin(0);
            }
          }}>
          <MapView.Marker
            title={'Your Position'}
            coordinate={{
              latitude: Number(location.latitude),
              longitude: Number(location.longitude),
            }}
          />
        </MapView>
      );
    } else {
      return (
        <Section alignCenter>
          <ActivityIndicator size="large" />
        </Section>
      );
    }
  },
  {name: 'MapView'},
);

const LocationModal = ({
  visible = false,
  dataLocation,
  title = '',
  onSelectItem,
  onBackBackButtonPress,
}) => {
  const {colors} = useTheme();
  const refMarker = useRef(null);
  const [location, setLocation] = useState({
    longitude: 106.841036,
    latitude: -6.173292,
  });
  const [mapMargin, setMapMargin] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (visible) {
      setLoader(true);
      Geolocation.getCurrentPosition(
        async info => {
          const {longitude, latitude} = info.coords;
          if (dataLocation && dataLocation.latitude) {
            setLocation(dataLocation);
          } else {
            setLocation({longitude, latitude});
          }
          setLoader(false);
        },
        async () => {
          setLoader(false);
        },
        Platform.OS === 'android'
          ? {}
          : {enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000},
      );
    }
  }, [visible, dataLocation]);

  const onRegionChange = async region => {
    setLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };
  const mapAnimateCamera = newCoordinate => {
    if (refMarker) {
      refMarker.current.animateCamera(
        {
          center: newCoordinate,
          zoom: 15,
        },
        1000,
      );
    }
  };

  const callbackAutocomplete = item => {
    const {lat, lng} = item.location;

    const dataCoordinate = {
      latitude: lat,
      longitude: lng,
    };
    // callbackMap(dataCoordinate);
    setLocation(dataCoordinate);
    mapAnimateCamera(dataCoordinate);
  };

  const savePinPointLocation = () => {
    onSelectItem(location);
  };

  return (
    <Modal visible={visible} onRequestClose={onBackBackButtonPress}>
      <Section
        style={{
          height: '94%',
          marginTop: 55,
        }}>
        <RenderMap
          refMarker={refMarker}
          location={location}
          loader={loader}
          onRegionChange={onRegionChange}
          mapMargin={mapMargin}
          setMapMargin={setMapMargin}
        />
      </Section>
      <SearchGoogleAutocomplete
        back
        placeholder={title}
        backPress={onBackBackButtonPress}
        callbackAutocomplete={callbackAutocomplete}
      />
      <Button
        style={{
          position: 'absolute',
          bottom: 0,
          marginBottom: 20,
          width: '90%',
          alignSelf: 'center',
        }}
        onPress={savePinPointLocation}
        color={colors.background}
        mode={'contained'}>
        Save Pin Location
      </Button>
    </Modal>
  );
};

export default withProfiler(LocationModal, {name: 'LocationModal'});
