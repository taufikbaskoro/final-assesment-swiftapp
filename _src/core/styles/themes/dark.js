import {DarkTheme as PaperDarkTheme, Colors} from 'react-native-paper';
import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: Colors.white,
    accent: Colors.black,
    background: '#333333',
    text: '#ffffff',
  },
};

export default CustomDarkTheme;
