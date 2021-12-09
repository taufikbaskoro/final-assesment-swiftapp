import React, {useState, useMemo, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigationRef} from '@app/helpers/Navigation';
import {useReactiveVar} from '@apollo/client';
import {rxUserToken} from '@app/services/cache';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {StackAuth} from '@app/navigations/_stack-auth';
import {StackApp} from '@app/navigations/_stack-app';
import {NavigatorContext} from '@app/helpers/Context';
import {onGoStore} from '@app/helpers/Version';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native-appearance';

import CustomDarkTheme from '@app/styles/themes/dark';
import CustomLightTheme from '@app/styles/themes/light';

import AppLoader from '@app/components/Loader';
import AppSnackBar from '@app/components/SnackBar';
import Dialog from '@app/components/Dialog';
import useAppInitialize from '@root/_src/core/hooks/_useAppInitialize';

import * as Sentry from '@sentry/react-native';

const routingInstrumentation = new Sentry.ReactNavigationV5Instrumentation();
export const Stack = createStackNavigator();

const AppNavigator = () => {
  const {updates} = useAppInitialize();

  /**
   * ---------------------------------------------------- *
   * @var {hooks}
   * ---------------------------------------------------- *
   */
  const [, setIsDarkTheme] = useState(false);
  const themeScheme = useColorScheme();
  const getRxUserToken = useReactiveVar(rxUserToken);
  const routeNameRef = useRef();
  const theme = themeScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;
  const {t} = useTranslation();

  /**
   * ---------------------------------------------------- *
   * @function {useMemo}
   * ---------------------------------------------------- *
   */
  const navigatorContext = useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme(isDarkThemeNew => !isDarkThemeNew);
      },
    }),
    [],
  );

  /**
   * ---------------------------------------------------- *
   * @function onNavigatorContainerStateChange
   * on navigator state change
   * ---------------------------------------------------- *
   */
  const onNavigatorContainerStateChange = () => {
    try {
      const currentRouteName =
        navigationRef?.current.getCurrentRoute() === undefined
          ? ''
          : navigationRef.current.getCurrentRoute().name;

      routeNameRef.current = currentRouteName;
    } catch (e) {
      console.log('[err] navigator container state change', e);
    }
  };

  /**
   * ---------------------------------------------------- *
   * @function onNavigatorReady
   * on navigator ready
   * ---------------------------------------------------- *
   */
  const onNavigatorReady = () => {
    try {
      routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      routingInstrumentation.registerNavigationContainer(navigationRef);
    } catch (err) {
      console.log('[err] navigator on ready', err);
    }
  };

  const renderDialogForceUpdate = () => {
    return (
      <Dialog
        visible={updates}
        message={t('label.newVersionFound')}
        secondButtonLabel={t('label.cancel')}
        onPressSecondButton={() => console.log('cancel')}
        buttonLabel={t('label.update')}
        onPressButton={onGoStore}
      />
    );
  };

  /**
   * ---------------------------------------------------- *
   * @returns {render}
   * ---------------------------------------------------- *
   */
  return (
    <SafeAreaView style={{flex: 1}}>
      <PaperProvider theme={theme}>
        <NavigatorContext.Provider value={navigatorContext}>
          <NavigationContainer
            theme={theme}
            ref={navigationRef}
            onStateChange={onNavigatorContainerStateChange}
            onReady={onNavigatorReady}>
            {renderDialogForceUpdate()}
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {getRxUserToken === null ? StackAuth() : StackApp()}
            </Stack.Navigator>
          </NavigationContainer>
        </NavigatorContext.Provider>
        <AppLoader />
        <AppSnackBar />
      </PaperProvider>
    </SafeAreaView>
  );
};

export default AppNavigator;
