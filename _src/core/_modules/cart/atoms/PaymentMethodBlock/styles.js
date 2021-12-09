import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  checkoutPaymentWrapper: {
    width: '100%',
    paddingHorizontal: 15,
    flex: 1,
  },
  checkoutPaymentTitle: {
    paddingBottom: 10,
  },
  paymentTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  paymentDescription: {
    fontSize: 14,
  },
  checkoutPaymentContent: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerBlockStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerBlockContentStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentGroupingText: {
    fontSize: 14,
  },
  paymentItemText: {
    fontSize: 14,
    paddingLeft: 15,
  },
});

export default styles;
