import {normalize} from '@app/styles/mixins';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  promoInput: {
    width: normalize(200),
    height: normalize(40),
    flex: 1,
  },
  promoInputText: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  giftCardWrapper: {
    width: '100%',
    paddingHorizontal: 15,
  },
  giftCardTitle: {
    paddingVertical: 15,
  },
  giftCardContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
  giftCardBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
