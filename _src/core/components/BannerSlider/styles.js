/* eslint-disable no-undef */
import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';

const sliderHeight = {
  height: Mixins.MAX_WIDTH - 200,
};

export default styles = StyleSheet.create({
  loaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    ...sliderHeight,
  },
  sliderFrame: {
    ...Mixins.padding(20, 0, 0, 0),
  },
  sliderPaginationStyles: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  sliderPaginationDot: {
    width: 10,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 0,
    top: -10,
    backgroundColor: Colors.PRIMARY,
  },
  sliderPaginationDotInactive: {
    // Define styles for inactive dots here
    backgroundColor: Colors.GRAY_DARK,
  },
  sliderImage: {
    width: Mixins.MAX_WIDTH,
    top: -25,
    ...sliderHeight,
  },
  imageLoader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
