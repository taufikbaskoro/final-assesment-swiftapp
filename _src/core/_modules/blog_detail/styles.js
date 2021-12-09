import {StyleSheet} from 'react-native';

import {Mixins} from '@app/styles';

const styles = StyleSheet.create({
  blogImageContainer: {
    width: Mixins.MAX_WIDTH,
    height: Mixins.MAX_HEIGHT * 0.35,
  },
});

export default styles;
