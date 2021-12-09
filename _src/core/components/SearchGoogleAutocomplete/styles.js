import {StyleSheet} from 'react-native';

import {Mixins} from '@app/styles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    flex: 1,
    width: '100%',
    zIndex: 99,
  },
  itemContainer: {
    alignItems: 'flex-start',
    ...Mixins.padding(20, 10, 20, 10),
    width: Mixins.MAX_WIDTH,
    borderBottomColor: '#FFF',
    borderBottomWidth: 0.5,
  },
  flatlistContainer: {
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 1,
  },
  flatlistContent: {
    zIndex: 2,
    top: 0,
  },
});

export default styles;
