import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  barContainer: {
    borderColor: Colors.GRAY_MEDIUM,
    borderBottomWidth: 1,
  },
  customerIconContainer: {
    backgroundColor: '#D8AF7B',
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginVertical: normalize(20),
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default styles;
