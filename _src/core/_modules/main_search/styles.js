import {StyleSheet} from 'react-native';
import {Mixins} from '@app/styles';
import {Colors as ColorsPaper} from 'react-native-paper';

const styles = StyleSheet.create({
  resultContainer: {
    paddingTop: 10,
  },
  resultImage: {
    height: 50,
    width: 50,
    borderColor: ColorsPaper.grey300,
    borderWidth: 1,
    borderRadius: 5,
  },
  resultItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 5,
  },
  searchButton: {
    width: Mixins.MAX_WIDTH * 0.4,
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  searchInput: {
    width: Mixins.MAX_WIDTH * 0.4,
    borderBottomWidth: 0,
    height: 60,
  },
});

export default styles;
