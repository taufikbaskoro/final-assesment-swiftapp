import {StyleSheet} from 'react-native';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  blockHeaderText: {
    marginBottom: normalize(5),
  },
  orderStatusLine: {
    alignSelf: 'flex-start',
    marginTop: normalize(25),
  },
  orderStatusItemText: {
    flex: 1,
  },
  productItemsTitle: {
    marginBottom: normalize(5),
  },
  requestReturnButton: {
    borderColor: 'white',
    backgroundColor: 'white',
  },
  requestReturnButtonText: {
    color: 'red',
  },
});

export default styles;
