import {StyleSheet} from 'react-native';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  saveButton: {
    alignSelf: 'center',
    marginVertical: normalize(50),
  },
  subContainer: {
    paddingTop: normalize(20),
  },
  labelBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: -55,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default styles;
