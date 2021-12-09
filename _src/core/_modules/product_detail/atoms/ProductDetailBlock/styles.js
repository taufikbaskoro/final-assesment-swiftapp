import {StyleSheet} from 'react-native';
import {Colors} from '@app/styles';

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: Colors.WHITE,
    borderBottomWidth: 0.5,
  },

  headerItem: {
    borderColor: Colors.PRIMARY,
    borderRadius: 0,
  },

  selectedHeaderItemStyle: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },

  unselectedHeaderItemStyle: {
    flex: 0.5,
    backgroundColor: Colors.PRIMARY_DISABLED,
  },
});

export default styles;
