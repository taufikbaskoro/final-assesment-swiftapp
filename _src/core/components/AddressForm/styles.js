import {normalize} from '@app/styles/mixins';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  defaultAddressSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultAddressText: {
    marginHorizontal: normalize(5),
  },
  pinPointButtonText: {
    borderWidth: 1,
    borderRadius: normalize(8),
    padding: normalize(10),
    marginVertical: normalize(8),
  },
  saveAddressButton: {
    alignSelf: 'center',
    marginTop: normalize(20),
    marginBottom: normalize(50),
  },
  subContainer: {
    paddingTop: normalize(20),
  },
});

export default styles;
