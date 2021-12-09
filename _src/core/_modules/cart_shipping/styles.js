import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.GRAY_MEDIUM,
    borderTopWidth: 0.5,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
  },
  mainContainer: {
    flex: 1,
    paddingTop: normalize(20),
    padding: 15,
    backgroundColor: '#f3f3f3',
  },
  paymentButtonContainer: {
    width: Mixins.MAX_WIDTH,
    backgroundColor: Colors.PRIMARY,
    height: normalize(50),
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  paymentButtonContainerDisabled: {
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  paymentButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: normalize(17),
  },
  priceBlockContainer: {
    borderColor: Colors.GRAY_MEDIUM,
    borderTopWidth: 0.5,
    width: Mixins.MAX_WIDTH,
    paddingVertical: normalize(10),
    backgroundColor: Colors.WHITE,
  },
  priceBlockTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(25),
  },
});

export default styles;
