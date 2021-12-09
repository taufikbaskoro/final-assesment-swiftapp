import React, {useState} from 'react';
import {View} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {useTranslation} from 'react-i18next';
import styles from '@app/_modules/cart/atoms/GuestEmailBlock/styles';

import Button from '@app/components/Button';
import Text from '@app/components/Text';
import Input from '@app/components/Input';

const GuestEmailBlock = ({onSetGuestEmail, isEmailFilled}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.guestEmail}>
      <View style={styles.guestEmailTitle}>
        <Text style={{fontSize: 14, fontWeight: '500'}}>Guest Email</Text>
      </View>
      <View style={styles.guestEmailContent}>
        <View style={styles.inputContainer}>
          <Input
            styleProp={{
              width: Mixins.MAX_WIDTH * 0.5,
            }}
            textStyleProp={{
              height: normalize(40),
            }}
            value={email}
            onChangeText={setEmail}
            placeholder="jhon.doe@gmail.com"
          />
          <Button
            label={isEmailFilled ? t('label.change') : t('label.submit')}
            styleProp={{
              width: normalize(80),
            }}
            onPress={() => onSetGuestEmail(email)}
          />
        </View>
      </View>
    </View>
  );
};

export default withProfiler(GuestEmailBlock, {name: 'GuestEmailBlock'});
