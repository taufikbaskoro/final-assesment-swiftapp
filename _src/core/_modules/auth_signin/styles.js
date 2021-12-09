import {MAX_WIDTH, padding, margin} from '@app/styles/mixins';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    width: MAX_WIDTH,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  caption: {
    paddingHorizontal: 20,
  },
  textInputFrame: {width: MAX_WIDTH, ...padding(0, 25, 0, 25)},
  textInput: {backgroundColor: Colors.white},
  btnSignin: {width: 150, ...margin(20, 0, 0, 0)},
  btnSignup: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  logoImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    ...margin(0, 0, 20, 0),
    width: 300,
  },
  footerForm: {
    marginTop: -55,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default styles;
