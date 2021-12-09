import {StyleSheet} from 'react-native';
import {MixinsNew} from '@app/styles/index';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  categoryRowContainer: {
    ...MixinsNew.padding({left: 20, right: 20}),
  },
  btnCategory: {
    ...MixinsNew.margin({right: 10}),
  },
});
export default styles;
