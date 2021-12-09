import React, {useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useQuery, useReactiveVar} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {GET_UPDATE_FORM_RMA} from '@app/_modules/account_myreturn_detail/services/schema';
import {rxUserInformation} from '@app/services/cache';
import {modules} from '@root/swift.config';

import RMAFormModal from '@app/_modules/account/atoms/RMAFormModal';
import RenderIf from '@app/components/RenderIf';
import Text from '@app/components/Text';
import Section from '@app/components/Section';

const ReturnDetail = ({route}) => {
  if (!modules.account_myreturn_detail.enable) {
    return null;
  }

  const accountInformation = useReactiveVar(rxUserInformation);
  const {increment_id, order_number} = route.params;

  const [rmaFormVisibility, setRmaFormVisibility] = useState(true);

  const {data, loading, error} = useQuery(GET_UPDATE_FORM_RMA, {
    variables: {
      email: accountInformation.email,
      increment_id,
    },
    fetchPolicy: 'network-only',
  });

  const rmaFormData = useMemo(() => {
    if (data) {
      return data.getUpdateFormDataAwRma?.detail_rma;
    }
    return null;
  }, [data]);

  const customFieldFormData = useMemo(() => {
    if (data) {
      return data.getUpdateFormDataAwRma?.form_data;
    }
    return null;
  }, [data]);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <Section centerChildren>
        <Text>Oops, Something went wrong</Text>
      </Section>
    );
  }

  return (
    <>
      <RenderIf condition={rmaFormData}>
        <RMAFormModal
          type="update-request"
          orderNumber={order_number}
          incrementId={increment_id}
          rmaFormData={rmaFormData}
          customFieldFormData={customFieldFormData}
          visible={rmaFormVisibility}
          setVisible={setRmaFormVisibility}
        />
      </RenderIf>
    </>
  );
};

export default withProfiler(ReturnDetail, {name: 'ReturnDetail'});
