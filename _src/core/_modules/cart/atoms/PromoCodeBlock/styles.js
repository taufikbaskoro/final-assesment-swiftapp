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
  promoWrapper: {
    width: '100%',
    paddingHorizontal: 15,
  },
  promoTitle: {
    paddingVertical: 15,
  },
  promoContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
  promoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  titleDescription: {
    fontSize: 14,
  },
});

export default styles;
