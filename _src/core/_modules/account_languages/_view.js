import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

import Appbar from '@app/components/AppBar';
import RadioButton from '@app/components/RadioButton';
import Section from '@app/components/Section';
import Text from '@app/components/Text';

const Views = ({languages, selectedLanguage, changeLanguage}) => {
  const {t} = useTranslation();
  const LanguageItemBar = withProfiler(
    ({label, onPress}) => {
      return (
        <TouchableOpacity style={styles.barContainer} onPress={onPress}>
          <RadioButton
            selected={selectedLanguage === label}
            onPress={onPress}
          />
          <Text style={styles.itemText}>{label}</Text>
        </TouchableOpacity>
      );
    },
    {name: 'LanguageItemBar'},
  );

  return (
    <>
      <NavBar useBack title={t('account.language.title')} />
      <Section>
        {languages.map(language => {
          return (
            <LanguageItemBar
              label={language}
              key={language}
              onPress={() => changeLanguage(language)}
            />
          );
        })}
      </Section>
    </>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    alignItems: 'center',
    borderColor: Colors.GRAY_DARK,
    borderBottomWidth: 0.5,
    width: '100%',
    flexDirection: 'row',
    padding: 15,
  },
  itemText: {
    marginHorizontal: normalize(10),
  },
});

export default withProfiler(Views, {name: 'LanguageView'});
