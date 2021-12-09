import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bannerFrame: {
    width: Mixins.MAX_WIDTH,
    alignSelf: 'center',
  },
  itemContainer: {
    flex: 0.5,
    width: Mixins.MAX_WIDTH * 0.5,
    alignItems: 'center',
    marginBottom: normalize(20),
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: normalize(10),
    borderWidth: 1,
    marginHorizontal: normalize(5),
    paddingBottom: 10,
  },
  itemImage: {
    height: normalize(180),
    width: Mixins.MAX_WIDTH / 2 - 30,
  },
});

export default styles;
