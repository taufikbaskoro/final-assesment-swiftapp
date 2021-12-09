import {StyleSheet} from 'react-native';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  dateText: {
    marginBottom: normalize(30),
    color: Colors.GRAY_MEDIUM,
  },
  mainContainer: {
    flex: 1,
    margin: normalize(20),
  },
  titleText: {
    marginBottom: normalize(10),
  },
});

export default styles;
