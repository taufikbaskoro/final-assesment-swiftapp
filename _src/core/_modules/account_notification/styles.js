import {StyleSheet} from 'react-native';
import {normalize} from '@app/styles/mixins';
import {Colors, Mixins} from '@app/styles';

const styles = StyleSheet.create({
  barContainer: {
    height: normalize(60),
    width: Mixins.MAX_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(30),
    borderColor: Colors.GRAY_MEDIUM,
    borderBottomWidth: 1,
  },
  marginSpacing: {
    marginVertical: normalize(20),
  },
});

export default styles;
