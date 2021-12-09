import React from 'react';
import {useTranslation} from 'react-i18next';
import {withProfiler} from '@sentry/react-native';
import {SafeAreaView} from 'react-native';
import {formSchema} from '@app/_modules/account_trackorder/forms';

import AppBar from '@app/components/AppBar';
import Forms from '@app/components/_Forms/index';

const TrackOrderScreen = ({loading, onPostData, onPostError}) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <AppBar useBack title="Track Order" />
      <Forms
        fields={formSchema}
        onSubmit={onPostData}
        onError={onPostError}
        loading={loading}
        buttonTitle={t('label.trackOrder')}
      />
    </SafeAreaView>
  );
};

export default withProfiler(TrackOrderScreen, {name: 'TrackOrderScreen'});
