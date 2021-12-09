import {StyleSheet} from 'react-native';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    marginVertical: normalize(50),
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
