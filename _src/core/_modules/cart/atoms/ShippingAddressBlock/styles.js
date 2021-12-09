import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Mixins.MAX_WIDTH,
    padding: normalize(15),
    borderColor: Colors.GRAY_MEDIUM,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  listContainer: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 0.2,
    borderColor: Colors.BLACK,
  },
  selectedAddressWrapper: {
    // paddingVertical: 15,
    width: '100%',
  },
  selectedAddressTitle: {
    padding: 0,
  },
  selectedAddressTitleLabel: {
    paddingVertical: 15,
    fontWeight: '500',
  },
  selectedAddressContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
});

export default styles;
