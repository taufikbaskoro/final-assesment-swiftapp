import {StyleSheet} from 'react-native';
import {Colors, Mixins, Typography} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  blockContainer: {
    padding: normalize(12),
    borderRadius: normalize(10),
    marginVertical: normalize(10),
  },

  buttonContainer: {
    width: normalize(50),
    height: normalize(30),
    marginHorizontal: normalize(10),
    alignSelf: 'center',
    borderRadius: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    height: normalize(60),
    ...Mixins.boxShadow('#f2f2f2', 5),
    width: Mixins.MAX_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  marginSpacingBottom: {
    marginBottom: 10,
  },

  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    ...Typography.FONT_BOLD,
    color: Colors.BLACK,
    fontSize: normalize(18),
  },

  trackButton: {
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY,
    borderWidth: 0,
    marginVertical: normalize(5),
  },
});

export default styles;
