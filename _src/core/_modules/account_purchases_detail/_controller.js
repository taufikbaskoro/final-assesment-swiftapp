import React, {useMemo, useState} from 'react';
import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {customUseLazyQuery} from '@app/hooks/customApolloHooks';
import {useQuery, useReactiveVar} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {rxUserInformation} from '@app/services/cache';
import {
  GET_CUSTOMER_ORDER,
  GET_FORM_DATA_RMA,
} from '@app/_modules/account_purchases_detail/services/schema';

import Views from '@app/_modules/account_purchases_detail/_view';
import {modules} from '@root/swift.config';

const PurchaseDetail = ({route}) => {
  if (!modules.account_purchases_detail.enable) {
    return null;
  }

  const accountInformation = useReactiveVar(rxUserInformation);
  const {email, order_number} = route.params;
  // prettier-ignore
  let filterInput = email === undefined ? {ids: {eq: order_number}} : {email, ids: {eq: order_number}};

  const [rmaFormVisibility, setRmaFormVisibility] = useState(false);

  const [loadFormDataRMA, formDataRMAData] =
    customUseLazyQuery(GET_FORM_DATA_RMA);

  const onRequestReturn = async () => {
    await loadFormDataRMA({
      variables: {
        email: accountInformation.email,
        order_number,
      },
    });
  };

  const rmaFormData = useMemo(() => {
    if (formDataRMAData?.data) {
      setRmaFormVisibility(true);
      return formDataRMAData.data.getNewFormDataAwRma;
    }
    return null;
  }, [formDataRMAData]);

  const {data, loading, error} = useQuery(GET_CUSTOMER_ORDER, {
    variables: {
      filters: filterInput,
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <Views
      item={data}
      onRequestReturn={onRequestReturn}
      rmaFormData={rmaFormData}
      formDataLoading={formDataRMAData.loading}
      rmaFormVisibility={rmaFormVisibility}
      setRmaFormVisibility={setRmaFormVisibility}
    />
  );
};

export default withProfiler(PurchaseDetail, {name: 'PurchaseDetail'});
