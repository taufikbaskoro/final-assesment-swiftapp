import {StyleSheet} from 'react-native';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  cartItemWrapper: {
    width: '100%',
  },
  cartItemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    paddingBottom: 15,
    alignItems: 'center',
  },
  cartItemContainer: {
    borderColor: Colors.GRAY_MEDIUM,
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  cartItemContainerNoBorderTop: {
    borderColor: Colors.GRAY_MEDIUM,
    borderTopWidth: 0,
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  cartItemContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemWrapper: {
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f3f3f3',
    marginRight: 15,
    height: 80,
  },
  itemImages: {
    height: normalize(50),
    width: normalize(50),
    flex: 1,
  },
  itemDetails: {
    width: '75%',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  itemName: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemQty: {
    fontSize: 12,
    fontWeight: '400',
  },
  itemPrice: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },
});

export default styles;
