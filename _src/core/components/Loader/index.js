import React from 'react';
import Section from '@app/components/Section';

import {Modal} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useReactiveVar} from '@apollo/client';
import {rxAppLoading} from '@app/services/cache';
import {Colors} from '@app/styles';

export default function Loader({loading: loadingProp = null}) {
  const loading = useReactiveVar(rxAppLoading);
  const loadingStatus = loadingProp !== null ? loadingProp : loading;

  return (
    <Modal visible={loadingStatus} transparent>
      <Section
        flex
        maxWidth
        centerChildren
        backgroundColor="#00000040"
        heightScaling={false}>
        <Section radius width={100} height={100} centerChildren scaling={false}>
          <ActivityIndicator color={Colors.PRIMARY} />
        </Section>
      </Section>
    </Modal>
  );
}
