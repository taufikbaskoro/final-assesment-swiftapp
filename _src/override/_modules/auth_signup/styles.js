import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 30,
    marginBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#ff9393',
    textAlign: 'center',
  },
  caption: {
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  labelBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#ff9393',
  },
  footerForm: {
    marginTop: -55,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 20,
  },
});

export default styles;
