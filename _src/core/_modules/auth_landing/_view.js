import React from 'react';
import {withProfiler} from '@sentry/react-native';
import {Button} from 'react-native-paper';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

import Section from '@app/components/Section';
import RenderIf from '@app/components/RenderIf';

const Views = ({t, onSkip}) => {
  return (
    <Section flex alignCenter centerChildren>
      <RenderIf condition={modules.auth_signin.enable}>
        <Section vmargin>
          <Button
            mode="contained"
            style={{width: 150}}
            onPress={() =>
              navigateTo(modules.auth_signin.enable, modules.auth_signin.name)
            }>
            {t('auth_landing.btn.signin')}
          </Button>
        </Section>
      </RenderIf>

      <RenderIf condition={modules.auth_signup.enable}>
        <Section vmargin>
          <Button
            mode="contained"
            style={{width: 150}}
            onPress={() =>
              navigateTo(modules.auth_signup.enable, modules.auth_signup.name)
            }>
            {t('auth_landing.btn.signup')}
          </Button>
        </Section>
      </RenderIf>

      <Section style={{marginTop: 10}}>
        <Button mode="text" onPress={onSkip}>
          {t('auth_landing.btn.skip')}
        </Button>
      </Section>
    </Section>
  );
};

export default withProfiler(Views, {name: 'LandingView'});
