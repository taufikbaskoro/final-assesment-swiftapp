import Section from '@app/components/Section';
import Text from '@app/components/Text';
import React from 'react';
import {Modal} from 'react-native';
import Button from '@app/components/Button';
import styles from '@app/components/Dialog/styles';

const Dialog = ({
  visible,
  secondButtonLabel,
  onPressSecondButton,
  buttonLabel,
  onPressButton,
  message = '',
}) => {
  return (
    <Modal visible={visible} transparent>
      <Section flex centerChildren backgroundColor={'rgba(0,0,0, .8)'}>
        <Section width={'90%'} padding2 radius centerChildren>
          <Text center large style={[styles.frameTitle]}>
            {message}
          </Text>
          <Section row>
            {onPressSecondButton && (
              <Section width={'50%'} hpadding={5}>
                <Button
                  label={secondButtonLabel.toUpperCase()}
                  onPress={onPressSecondButton}
                  styleProp={{width: '100%'}}
                />
              </Section>
            )}
            <Section width={onPressSecondButton ? '50%' : '100%'} hpadding={5}>
              <Button
                label={buttonLabel.toUpperCase()}
                onPress={onPressButton}
                styleProp={{width: '100%'}}
              />
            </Section>
          </Section>
        </Section>
      </Section>
    </Modal>
  );
};

export default Dialog;
