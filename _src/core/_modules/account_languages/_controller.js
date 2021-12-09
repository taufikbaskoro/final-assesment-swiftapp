import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {withProfiler} from '@sentry/react-native';
import {Storage} from '@app/helpers/Storage';
import {modules, languages} from '@root/swift.config';

import Views from '@app/_modules/account_languages/_view';

const Controller = () => {
  if (!modules.account_languages.enable) {
    return null;
  }
  const {i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    checkCurrentLanguage();
  }, []);

  const checkCurrentLanguage = async () => {
    const currentLanguage = await Storage.get(Storage.name.USER_LANGUAGE);
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage.language);
    } else {
      setSelectedLanguage(languages[0]);
    }
  };

  const changeLanguage = async language => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    Storage.set(Storage.name.USER_LANGUAGE, {
      language: language,
    });
  };

  return (
    <Views
      languages={languages}
      selectedLanguage={selectedLanguage}
      changeLanguage={changeLanguage}
    />
  );
};

export default withProfiler(Controller, {name: 'LanguageController'});
