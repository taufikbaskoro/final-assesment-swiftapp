import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  cartItemActionIcon: {
    borderRadius: normalize(25),
    backgroundColor: Colors.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(5),
  },

  cartItemContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
  },

  cartItemDetailText: {
    marginBottom: normalize(3),
  },

  cartItemImage: {
    height: normalize(140),
    width: Mixins.MAX_WIDTH * 0.3,
    borderColor: Colors.GRAY_MEDIUM,
    borderWidth: 1,
    borderRadius: normalize(10),
    resizeMode: 'contain',
  },

  checkOutButtonContainer: {
    backgroundColor: Colors.PRIMARY,
    height: normalize(50),
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 0,
    width: '60%',
  },

  checkOutButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: normalize(17),
  },

  listContainer: {
    width: Mixins.MAX_WIDTH,
    paddingTop: normalize(20),
  },

  subTotalSubContainer: {
    width: '40%',
    borderTopWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
  },

  wishlistIcon: {
    // backgroundColor: Colors.GRAY_LIGHT,
    // borderRadius: normalize(25),
    // padding: normalize(6),
    borderRadius: normalize(25),
    backgroundColor: Colors.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(5),
    marginRight: 15,
  },
});

export default styles;
