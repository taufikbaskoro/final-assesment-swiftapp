import {Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  checkButton: {
    width: normalize(200),
    marginVertical: normalize(20),
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: normalize(60),
    width: Mixins.MAX_WIDTH,
    alignSelf: 'center',
  },
  sectionContainer: {
    marginVertical: normalize(20),
    width: Mixins.MAX_WIDTH * 0.8,
  },
});

export default styles;
