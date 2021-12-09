import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  guestEmail: {
    // marginVertical: 15,
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  guestEmailTitle: {
    paddingVertical: 15,
    // backgroundColor: Colors.GRAY_LIGHT,
  },
  guestEmailContent: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
