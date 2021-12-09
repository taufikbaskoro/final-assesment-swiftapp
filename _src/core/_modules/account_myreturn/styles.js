import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';

const styles = StyleSheet.create({
  btnFrame: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  blockHeaderText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blockContentText: {
    fontSize: 12,
  },
  detailsButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  detailsButtonText: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsMainContainer: {
    marginBottom: 20,
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Mixins.MAX_WIDTH * 0.8,
    flex: 1,
    marginVertical: 10,
  },
  orderStatusItemContainer: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 5,
  },
  orderStatusLine: {
    height: 2,
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: 25,
    borderWidth: 1,
    width: Math.ceil((Mixins.MAX_WIDTH * 0.8 - 200) * 0.3),
  },
  orderStatusItemText: {
    flex: 1,
    fontSize: 8,
    textAlign: 'center',
  },
  paymentAmountText: {
    fontSize: 14,
  },
  priceBlockContainer: {
    padding: 20,
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 5,
  },
});

export default styles;
