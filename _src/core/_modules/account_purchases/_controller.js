import React, {useEffect, useState} from 'react';
import {withProfiler} from '@sentry/react-native';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {GET_CUSTOMER_ORDERS} from '@app/_modules/account_purchases/services/schema';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

import Views from '@app/_modules/account_purchases/_view';

const Purchases = () => {
  if (!modules.account_purchases.enable) {
    return null;
  }

  const [customerOrders, setCustomerOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [queryVariables, setQueryVariables] = useState({
    pageSize: 6,
    currentPage: 1,
  });
  const {data: customerOrdersData, loading} = customUseQuery(
    GET_CUSTOMER_ORDERS,
    {
      variables: queryVariables,
    },
  );

  useEffect(() => {
    if (customerOrdersData) {
      const {items, total_count} = customerOrdersData.customerOrders;
      const currentData = customerOrders;
      const newData = [...currentData, ...items];
      setCustomerOrders(newData);
      setTotalCount(total_count);
      if (total_count === newData.length) {
        setNoMoreData(true);
      }
    }
  }, [customerOrdersData]);

  const onLoadMore = () => {
    if (!loading) {
      if (customerOrders.length !== totalCount) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);

        const queryVariablesTmp = {
          ...queryVariables,
          currentPage: newPage,
        };
        setQueryVariables(queryVariablesTmp);
      } else {
        setNoMoreData(true);
      }
    }
  };

  const onRefresh = async () => {
    const queryVariablesTmp = {
      ...queryVariables,
      currentPage: 1,
    };
    await setRefreshing(true);
    await setCustomerOrders([]);
    await setCurrentPage(1);
    await setNoMoreData(false);
    await setQueryVariables(queryVariablesTmp);
    await setRefreshing(false);
  };

  const onNavigateToPdp = order_number => {
    navigateTo(
      modules.account_purchases_detail.enable,
      modules.account_purchases_detail.name,
      {
        order_number,
      },
    );
  };

  /**
   * [props] set controller props
   * @return {object}
   */
  const controllerProps = {
    onRefresh,
    onLoadMore,
    onNavigateToPdp,
    loading,
    noMoreData,
    refreshing,
    customerOrders,
  };

  return <Views {...controllerProps} />;
};

export default withProfiler(Purchases, {name: 'Purchases'});
