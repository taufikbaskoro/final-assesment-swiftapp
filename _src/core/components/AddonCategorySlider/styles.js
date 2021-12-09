import {StyleSheet} from 'react-native';
import {Mixins, MixinsNew} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  categoryImageContainer: {
    flex: 1,
    width: normalize(70),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  categoryImage: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(50),
    borderColor: '#f7f7f7',
    alignSelf: 'center',
    borderWidth: 0.5,
  },

  categoryTitle: {
    textAlign: 'center',
    fontSize: 10,
    ...MixinsNew.margin({top: 8}),
  },

  listContainer: {
    height: normalize(40),
    width: Mixins.MAX_WIDTH,
    paddingTop: normalize(15),
  },
});

export default styles;
