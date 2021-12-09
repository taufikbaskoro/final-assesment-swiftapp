import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Mixins.MAX_WIDTH,
    padding: normalize(15),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: normalize(15),
    backgroundColor: 'white',
    width: '100%',
  },
  listContainer: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 0.2,
    borderColor: Colors.BLACK,
  },

  modalContainer: {
    backgroundColor: Colors.WHITE,
    padding: normalize(10),
  },
  modalMasking: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
  },
  headerBlockStyle: {
    borderBottomWidth: 1,
    alignItems: 'center',
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  textShippingGrouping: {
    paddingVertical: normalize(8),
    fontSize: 14,
    fontWeight: '500',
  },
  textShippingGroupingContentLabelWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  textShippingGroupingContentLabel: {
    fontSize: 14,
  },
  textShippingGroupingHeaderLabelWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
