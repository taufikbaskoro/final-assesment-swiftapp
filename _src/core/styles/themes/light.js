import {DefaultTheme as PaperDefaultTheme, Colors} from 'react-native-paper';
import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: Colors.black,
    accent: Colors.grey100,
    background: '#ffffff',
    text: '#333333',
  },
};

export default CustomDefaultTheme;
