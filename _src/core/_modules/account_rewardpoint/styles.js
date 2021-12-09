import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  currentBalanceContainer: {
    padding: normalize(20),
    backgroundColor: Colors.PRIMARY,
  },
  footerContainer: {
    margin: normalize(20),
  },
  transactionItemContainer: {
    height: normalize(100),
    width: Mixins.MAX_WIDTH,
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionItemDetailContainer: {
    height: normalize(100),
    paddingVertical: normalize(15),
  },
  transactionItemIdContainer: {
    height: normalize(100),
    width: normalize(50),
    alignItems: 'center',
    paddingVertical: normalize(15),
  },
});

export default styles;
