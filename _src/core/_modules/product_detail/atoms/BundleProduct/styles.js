import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';

const styles = StyleSheet.create({
  addToCartButtonContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
  },

  bundleOptionContainer: {
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },

  bundleOptionItemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },

  bundleOptionItemImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderColor: 'rgba(0,0,0, 0.7)',
    borderWidth: 5,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },

  discountBoxContainer: {
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  imageContainer: {
    height: Mixins.MAX_HEIGHT * 0.5,
    width: Mixins.MAX_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainContainer: {
    flex: 1,
    // backgroundColor: Colors.WHITE,
  },

  priceRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productImage: {
    width: Mixins.MAX_WIDTH,
    height: Mixins.MAX_HEIGHT * 0.5,
    resizeMode: 'contain',
  },
});

export default styles;
