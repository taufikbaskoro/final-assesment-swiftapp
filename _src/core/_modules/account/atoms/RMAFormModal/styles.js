import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  attachmentImage: {
    height: normalize(100),
  },
  attachmentImageText: {
    fontSize: normalize(8),
  },
  cancelButton: {
    alignSelf: 'center',
    marginVertical: normalize(10),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  listContainer: {
    paddingHorizontal: normalize(20),
  },
  mainContainer: {
    height: Mixins.MAX_HEIGHT,
    width: Mixins.MAX_WIDTH,
  },
  messageInput: {
    width: '100%',
    marginVertical: normalize(20),
  },
  packageSentText: {
    marginHorizontal: normalize(10),
  },
  productImage: {
    height: normalize(120),
    width: normalize(100),
    marginRight: normalize(10),
  },
  hideMessasgesButton: {
    borderWidth: 0,
    alignSelf: 'center',
  },
  hideMessasgesButtonText: {
    textDecorationLine: 'underline',
  },
});

export default styles;
