import React from 'react';
import {Text} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {modules} from '@root/swift.config';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {navigateTo} from '@app/helpers/Navigation';

import useNavAppInitialize from '@app/hooks/_useNavAppInitialize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainHome from '@app/_modules/main_home';
import MainCategories from '@app/_modules/main_categories';
import Cart from '@app/_modules/cart';
import AccountWishlist from '@app/_modules/account_wishlist';
import Account from '@app/_modules/account';

const Tab = createBottomTabNavigator();

const StackAppTab = () => {
  /**
   * ---------------------------------------------------- *
   * @function useNavAppInitialize
   * @summary this use for initialize top of stack app
   * ---------------------------------------------------- *
   */
  useNavAppInitialize();

  const tabBarOptions = {showLabel: false};
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name={modules.main_home.name}
        key={modules.main_home.name}
        component={MainHome}
        listeners={() => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigateTo(modules.main_home.enable, modules.main_home.name);
          },
        })}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.PRIMARY : Colors.GRAY_DARK,
                fontWeight: 'bold',
              }}>
              {modules.main_home.name}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Icon
              name={'home'}
              style={{paddingHorizontal: normalize(25)}}
              size={normalize(25)}
              color={focused ? Colors.PRIMARY : Colors.GRAY_DARK}
            />
          ),
        }}
      />
      <Tab.Screen
        name={modules.main_categories.name}
        key={modules.main_categories.name}
        component={MainCategories}
        listeners={() => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigateTo(
              modules.main_categories.enable,
              modules.main_categories.name,
            );
          },
        })}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.PRIMARY : Colors.GRAY_DARK,
                fontWeight: 'bold',
              }}>
              {modules.main_categories.name}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Icon
              name={'microsoft'}
              style={{paddingHorizontal: normalize(25)}}
              size={normalize(25)}
              color={focused ? Colors.PRIMARY : Colors.GRAY_DARK}
            />
          ),
        }}
      />
      <Tab.Screen
        name={modules.cart.name}
        key={modules.cart.name}
        component={Cart}
        listeners={() => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigateTo(modules.cart.enable, modules.cart.name);
          },
        })}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.PRIMARY : Colors.GRAY_DARK,
                fontWeight: 'bold',
              }}>
              {modules.cart.name}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Icon
              name={'cart'}
              style={{paddingHorizontal: normalize(25)}}
              size={normalize(25)}
              color={focused ? Colors.PRIMARY : Colors.GRAY_DARK}
            />
          ),
        }}
      />
      <Tab.Screen
        name={modules.account_wishlist.name}
        key={modules.account_wishlist.name}
        component={AccountWishlist}
        listeners={() => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigateTo(
              modules.account_wishlist.enable,
              modules.account_wishlist.name,
            );
          },
        })}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.PRIMARY : Colors.GRAY_DARK,
                fontWeight: 'bold',
              }}>
              {modules.account_wishlist.name}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Icon
              name={'heart'}
              style={{paddingHorizontal: normalize(25)}}
              size={normalize(25)}
              color={focused ? Colors.PRIMARY : Colors.GRAY_DARK}
            />
          ),
        }}
      />
      <Tab.Screen
        name={modules.account.name}
        key={modules.account.name}
        component={Account}
        listeners={() => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigateTo(modules.account.enable, modules.account.name);
          },
        })}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.PRIMARY : Colors.GRAY_DARK,
                fontWeight: 'bold',
              }}>
              {modules.account.name}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Icon
              name={'account'}
              style={{paddingHorizontal: normalize(25)}}
              size={normalize(25)}
              color={focused ? Colors.PRIMARY : Colors.GRAY_DARK}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default StackAppTab;
