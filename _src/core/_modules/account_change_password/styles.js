import {StyleSheet} from 'react-native';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  changePasswordButton: {
    alignSelf: 'center',
    marginVertical: normalize(20),
  },
  errorLabel: {
    marginTop: normalize(30),
  },

  subContainer: {
    paddingTop: normalize(20),
  },
});

export default styles;
