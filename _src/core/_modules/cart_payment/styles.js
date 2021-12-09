import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  placeOrderButton: {
    width: Mixins.MAX_WIDTH,
    backgroundColor: Colors.PRIMARY,
    height: normalize(50),
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  placeOrderButtonDisabled: {
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  placeOrderButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: normalize(17),
  },
  promoContainer: {
    borderColor: Colors.GRAY_LIGHT,
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(10),
    borderWidth: 1,
    borderRadius: normalize(15),
    marginVertical: normalize(15),
    flexDirection: 'column',
  },
  promoInput: {
    width: normalize(200),
    height: normalize(40),
  },
  promoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInputText: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  promoOuterContainer: {
    marginVertical: normalize(20),
    width: Mixins.MAX_WIDTH,
    paddingHorizontal: normalize(25),
    paddingVertical: normalize(5),
    borderTopWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
  },
});

export default styles;
