import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

const styles = StyleSheet.create({
  detailsButton: {
    ...Mixins.padding(8, 8, 8, 8),
    ...Mixins.margin(0, 5, 0, 5),
    backgroundColor: Colors.PRIMARY,
    borderRadius: normalize(10),
  },
  orderDateText: {
    fontSize: normalize(11),
  },
  orderStatusText: {
    marginTop: normalize(5),
  },
});

export default styles;
