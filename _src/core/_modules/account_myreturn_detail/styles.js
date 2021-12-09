import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  btnFrame: {
    flexDirection: 'row',
  },
  blockHeaderText: {
    marginBottom: normalize(5),
  },
  detailsButton: {
    ...Mixins.padding(8, 8, 8, 8),
    ...Mixins.margin(0, 5, 0, 5),
    backgroundColor: Colors.PRIMARY,
    borderRadius: normalize(10),
  },
  detailsButtonText: {
    color: Colors.WHITE,
    fontSize: normalize(13),
    fontWeight: 'bold',
  },
  detailsMainContainer: {
    marginBottom: normalize(20),
    marginTop: normalize(10),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderItemConatiner: {
    height: normalize(100),
    width: Mixins.MAX_WIDTH,
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Mixins.MAX_WIDTH * 0.8,
    flex: 1,
    marginVertical: normalize(10),
  },
  orderStatusItemContainer: {
    height: normalize(50),
    width: normalize(50),
    borderWidth: 1,
    borderRadius: normalize(5),
  },
  orderStatusLine: {
    height: 2,
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: normalize(25),
    borderWidth: 1,
    width: Math.ceil((Mixins.MAX_WIDTH * 0.8 - 200) * 0.3),
  },
  orderStatusItemText: {
    flex: 1,
  },
  paymentAmountText: {
    fontSize: normalize(15),
  },
  priceBlockContainer: {
    padding: normalize(20),
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: normalize(5),
  },
  returnRequestButton: {
    borderColor: 'white',
    backgroundColor: 'white',
  },
  returnRequestButtonText: {
    color: 'red',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacingMargin: {
    marginVertical: 10,
  },
});

export default styles;
