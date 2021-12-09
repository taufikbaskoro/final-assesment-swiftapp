import {StyleSheet} from 'react-native';
import {Colors, Mixins, MixinsNew} from '@app/styles/index';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  addToCartButtonContainer: {
    backgroundColor: Colors.PRIMARY,
  },

  bundleOptionContainer: {
    borderRadius: normalize(15),
    borderColor: '#000',
    borderWidth: 1,
    padding: normalize(10),
    marginBottom: normalize(10),
  },

  bundleOptionItemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },

  bundleOptionItemImage: {
    height: normalize(50),
    width: normalize(50),
    resizeMode: 'contain',
    borderColor: 'rgba(0,0,0, 0.7)',
    borderWidth: normalize(5),
    backgroundColor: 'grey',
    marginHorizontal: normalize(10),
  },

  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    ...MixinsNew.margin({top: 20, left: 20, right: 20}),
  },
  productImage: {
    width: Mixins.MAX_WIDTH,
    height: Mixins.MAX_HEIGHT * 0.5,
    resizeMode: 'contain',
  },
});

export default styles;
