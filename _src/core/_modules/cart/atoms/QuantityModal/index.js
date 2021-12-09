import React from 'react';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {useColorScheme} from 'react-native-appearance';
import {withProfiler} from '@sentry/react-native';
import {Button, Text, Colors as ColorsPaper} from 'react-native-paper';
import {KeyboardAvoidingView, Modal, StyleSheet, TextInput} from 'react-native';
import Section from '@app/components/Section';
import Icon from 'react-native-vector-icons/AntDesign';

const QuantityModal = ({
  visible = true,
  name,
  quantity = 0,
  onChangeQuantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onSubmit,
  submitLabel = 'Submit',
  loading,
  onBackBackButtonPress,
}) => {
  const scheme = useColorScheme();

  const color = scheme === 'dark' ? Colors.WHITE : Colors.BLACK;

  return (
    <Modal visible={visible} transparent onRequestClose={onBackBackButtonPress}>
      <Section backgroundColor="rgba(0, 0, 0, 0.6)">
        <Section height={Mixins.MAX_HEIGHT * 0.65} heightScaling={false} />
        <KeyboardAvoidingView behavior="position">
          <Section
            height={Mixins.MAX_HEIGHT * 0.35}
            heightScaling={false}
            centerChildren
            alignCenter
            maxWidth>
            <Section
              hmargin3
              style={styles.closeBtnContainer}
              onPress={onBackBackButtonPress}>
              <Icon name="close" size={normalize(20)} />
            </Section>
            <Text large style={{marginBottom: normalize(5)}}>
              {name}
            </Text>
            <Text style={{marginBottom: normalize(5)}}>Quantity</Text>

            <Section row centerChildren vmargin2 spaceBetween width={100}>
              <Section onPress={onDecreaseQuantity}>
                <Icon name="minuscircleo" size={normalize(20)} color={color} />
              </Section>

              <TextInput
                value={quantity.toString()}
                onChangeText={onChangeQuantity}
                keyboardType="number-pad"
                style={[
                  styles.quantityInput,
                  {
                    color: color,
                    borderColor: color,
                  },
                ]}
              />

              <Section onPress={onIncreaseQuantity}>
                <Icon name="pluscircleo" size={normalize(20)} color={color} />
              </Section>
            </Section>

            <Button
              loading={loading}
              mode="contained"
              onPress={() => onSubmit()}>
              <Text style={{color: ColorsPaper.white}}>{submitLabel}</Text>
            </Button>
          </Section>
        </KeyboardAvoidingView>
      </Section>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeBtnContainer: {
    alignSelf: 'flex-end',
  },
  quantityInput: {
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: normalize(16),
  },
});

export default withProfiler(QuantityModal, {name: 'QuantityModal'});
