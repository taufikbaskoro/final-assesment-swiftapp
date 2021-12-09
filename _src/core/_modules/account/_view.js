import React from 'react';
import {
  Button,
  useTheme,
  Avatar,
  TouchableRipple,
  Caption,
  Badge,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {accountMenu} from '@app/_modules/account/menus';

import Text from '@app/components/Text';
import Section from '@app/components/Section';

import styles from '@app/_modules/account/styles';
import AppBarComponent from '@app/components/AppBar/index';
import _ from 'lodash';

function AccountScreen({onLogOut, userData, onEditProfile}) {
  const theme = useTheme();
  const {background, disabled} = _.get(theme, 'colors');
  const NavigationBar = withProfiler(
    ({label, icon, onPress, mode, style}) => {
      return (
        <Button
          mode={mode}
          onPress={onPress}
          style={
            style || {
              width: '100%',
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: disabled,
            }
          }
          contentStyle={
            !style && {
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
            }
          }
          compact={!mode && true}
          icon={({size, color}) => (
            <Icon color={mode ? color : disabled} size={size} name={icon} />
          )}>
          {label}
        </Button>
      );
    },
    {name: 'NavigationBar'},
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppBarComponent title="Account Preferences" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{paddingHorizontal: 20}}>
          {userData && userData.firstname && (
            <TouchableRipple onPress={onEditProfile}>
              <Section
                row
                alignCenter
                vpadding3
                backgroundColor={background}
                style={{borderRadius: 8}}>
                <Avatar.Text
                  style={{marginRight: -20}}
                  labelStyle={{
                    fontSize: 18,
                  }}
                  size={75}
                  label={_.first(_.words(userData.firstname)) || 'U'}
                />
                <Badge style={{marginRight: 20}}>
                  <Icon name={'edit'} />
                </Badge>
                <Section backgroundColor={background} alignStart>
                  {userData === null ? (
                    <Text>Loading..</Text>
                  ) : (
                    <Text large bold>
                      {_.startCase(userData?.firstname)}{' '}
                      {_.startCase(userData?.lastname)}
                    </Text>
                  )}
                  {userData === null ? (
                    <Caption>Loading..</Caption>
                  ) : (
                    <Caption>{userData?.email}</Caption>
                  )}
                </Section>
              </Section>
            </TouchableRipple>
          )}
          {accountMenu.map(item => {
            return (
              item.show && (
                <NavigationBar
                  label={item.label}
                  icon={item.icon}
                  onPress={item.navigation}
                />
              )
            );
          })}

          {/*
          <Section vmargin2>
            <Section onPress={() => setViewMore(!viewMore)}>
              <Text underline>View More</Text>
            </Section>
          </Section> */}

          <NavigationBar
            label={'Log out'}
            mode={'contained'}
            icon={'log-out'}
            onPress={onLogOut}
            style={{marginVertical: 20}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withProfiler(AccountScreen, {name: 'AccountScreen'});
