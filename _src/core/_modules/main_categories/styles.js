import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  childrenContainer: {
    borderTopWidth: 0,
    borderBottomLeftRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
  },

  childrenItemContainer: {
    marginHorizontal: normalize(30),
    paddingVertical: normalize(10),
    borderColor: Colors.GRAY_MEDIUM,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.BLACK,
    borderWidth: 1,
    borderRadius: normalize(15),
    width: Mixins.MAX_WIDTH - 40,
    padding: normalize(15),
    backgroundColor: Colors.WHITE,
  },

  headerImage: {
    width: normalize(80),
    height: normalize(80),
    marginHorizontal: normalize(15),
  },

  listContainer: {
    flex: 1,
    marginHorizontal: normalize(20),
    paddingVertical: normalize(20),
  },

  vesMenuText: {
    borderColor: Colors.GRAY_MEDIUM,
    borderBottomWidth: normalize(3),
    paddingVertical: normalize(10),
    width: '100%',
  },

  vesMenuChildText: {
    width: Mixins.MAX_WIDTH * 0.85,
  },

  vesMenuWrapper: {
    alignSelf: 'stretch',
    paddingVertical: 5,
  },

  vesMenuNameWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
