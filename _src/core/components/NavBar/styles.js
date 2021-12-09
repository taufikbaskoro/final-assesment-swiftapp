import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  frameNavbar: {flexDirection: 'row'},
  frameBackButton: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '22%',
  },
  frameLogo: {
    width: 60,
    left: 10,
    resizeMode: 'contain',
  },
  frameSearch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameRightChildren: {width: '20%', flexDirection: 'row'},
});

export default styles;
