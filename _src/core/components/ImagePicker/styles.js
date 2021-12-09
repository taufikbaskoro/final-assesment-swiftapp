/* eslint-disable no-undef */
import {StyleSheet} from 'react-native';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

export default styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    fontSize: normalize(16),
  },
  buttonOpen: {
    marginVertical: normalize(20),
    // backgroundColor: Colors.GRAY_LIGHT,
    borderColor: Colors.GRAY_DARK,
  },
  framePreview: {
    padding: normalize(10),
  },
  imagePreview: {
    width: normalize(200),
    height: normalize(200),
    resizeMode: 'contain',
  },
});
