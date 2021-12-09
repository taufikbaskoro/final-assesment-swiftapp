/* eslint-disable no-undef */
import {StyleSheet} from 'react-native';

import {Mixins, Colors, Typography} from '@app/styles';

const htmlElements = {
  textAlign: 'justify',
  ...Mixins.margin(-20, 20, -20, 20),
  fontSize: Mixins.scaleFont(13),
  ...Typography.FONT_LIGHT,
};

const headers = {
  ...htmlElements,
  ...Typography.FONT_BOLD,
  fontSize: Mixins.scaleFont(20),
  textAlign: 'center',
  color: Colors.PRIMARY,
};

export default styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    ...Mixins.padding(10, 10, 10, 10),
  },
  content: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    height: Mixins.MAX_HEIGHT,
    width: Mixins.MAX_WIDTH,
  },

  div: {
    textAlign: 'center',
  },
  h3: {
    ...headers,
    ...Mixins.margin(10, 25, -20, 25),
  },
  h4: {
    ...htmlElements,
    fontSize: 18,
    ...Typography.FONT_BOLD,
  },

  h5: {
    ...htmlElements,
    ...Mixins.margin(0, 0, 0, 0),
    ...Typography.FONT_BOLD,
  },

  p: {
    ...htmlElements,
  },
});
