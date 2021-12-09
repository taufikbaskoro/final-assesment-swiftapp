import i18next from 'i18next';
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {Mixins, Colors} from '@app/styles';
import RNRestart from 'react-native-restart';

const styles = StyleSheet.create({
  errorDetailContainer: {
    borderRadius: 10,
    borderColor: Colors.BLACK,
    borderWidth: 0.5,
    marginTop: 10,
  },
  frameError: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: Mixins.MAX_HEIGHT * 0.3,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 40,
  },
  textSubTitle: {
    marginVertical: 20,
  },
  textError: {
    ...Mixins.padding(10, 10, 10, 10),
    ...Mixins.margin(10, 0, 0, 0),
  },
});

const ErrorBoundaryView = ({error}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <View style={styles.frameError}>
      <Image
        style={styles.image}
        source={require('@app/assets/images/oops.png')}
        resizeMode={'contain'}
      />
      <Text center xlarge bold>
        {i18next.t('errorBoundary.title')}
      </Text>
      <Text xlarge style={styles.textSubTitle}>
        {i18next.t('errorBoundary.subTitle')}
      </Text>

      <TouchableOpacity onPress={() => setShowDetail(!showDetail)}>
        <Text>{showDetail ? 'Hide Error Detail' : 'Show Error Detail'}</Text>
      </TouchableOpacity>

      {showDetail ? (
        <View style={styles.errorDetailContainer}>
          <Text center style={styles.textError}>
            {error.toString()}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.restartButton}
        onPress={() => RNRestart.Restart()}>
        <Text white>{i18next.t('errorBoundary.restart')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorBoundaryView;
