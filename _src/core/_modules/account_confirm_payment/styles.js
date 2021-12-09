import {StyleSheet} from 'react-native';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  confirmButtonText: {
    fontSize: normalize(16),
  },
  logoutButton: {
    marginVertical: normalize(20),
    // backgroundColor: Colors.GRAY_LIGHT,
    borderColor: Colors.GRAY_DARK,
    alignSelf: 'center',
  },
  frame: {
    flex: 1,
    padding: normalize(10),
  },
});

export default styles;
