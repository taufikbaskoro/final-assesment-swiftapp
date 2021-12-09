import {StyleSheet} from 'react-native';
import {MixinsNew} from '@app/styles/index';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
  frameProductItem: {
    ...MixinsNew.padding(10),
    width: 160,
  },
  productItemName: {
    ...MixinsNew.margin({top: 10}),
    fontWeight: 'bold',
    fontSize: 14,
  },
  productItemPrice: {
    fontSize: 12,
  },
});

export default styles;
