import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';

const styles = StyleSheet.create({
  autoCompleteContainer: {
    flex: 1,
    width: Mixins.MAX_WIDTH,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginVertical: 50,
    backgroundColor: Colors.WHITE,
    paddingBottom: 20,
  },
  resultContainer: {
    flex: 1,
    borderTopWidth: 0.8,
    width: Mixins.MAX_WIDTH,
    borderColor: Colors.GRAY_DARK,
  },
  resultImage: {
    height: 50,
    width: 50,
    borderColor: Colors.GRAY_MEDIUM,
    borderWidth: 1,
  },
  resultItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: Colors.GRAY_MEDIUM,
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
