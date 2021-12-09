import {MAX_WIDTH} from '@app/styles/mixins';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    width: MAX_WIDTH,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
  },
  marginVertical: {
    marginVertical: 10,
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
  img: {
    width: 150,
    height: 150,
  },
  productDisplay: {
    maxWidth: 150,
    minHeight: 200,
    marginVertical: 20,
    marginHorizontal: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
