import {Colors} from '@root/_src/core/styles/index';
import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  caption: {
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  close: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  label: {
    color: Colors.GRAY_DARK,
  },
  labelBold: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    width: Dimensions.get('screen').width * 0.8,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: Colors.WHITE,
  },
});

export default styles;
