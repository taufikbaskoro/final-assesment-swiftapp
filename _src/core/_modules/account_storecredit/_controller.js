import React, {useEffect, useState} from 'react';
import {withProfiler} from '@sentry/react-native';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {GET_STORE_CREDIT_TRANSACTIONS} from '@app/_modules/account_storecredit/services/schema';

import Views from '@app/_modules/account_storecredit/_view';
import {modules} from '@root/swift.config';

const StoreCredit = () => {
  if (!modules.account_storecredit.enable) {
    return null;
  }

  const [storeCreditTransactions, setStoreCreditTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [queryVariables, setQueryVariables] = useState({
    pageSize: 6,
    currentPage: 1,
  });
  const {data: storeCreditTransactionsData, loading} = customUseQuery(
    GET_STORE_CREDIT_TRANSACTIONS,
    {
      variables: queryVariables,
    },
  );

  useEffect(() => {
    if (storeCreditTransactionsData) {
      const {currency, value} =
        storeCreditTransactionsData.customer.store_credit.current_balance;
      setCurrentBalance({
        currency,
        value,
      });

      const {items, total_count} =
        storeCreditTransactionsData.customer.store_credit.transaction_history;
      const currentData = storeCreditTransactions;
      const newData = [...currentData, ...items];
      setStoreCreditTransactions(newData);
      setTotalCount(total_count);
    }
  }, [storeCreditTransactionsData]);

  const onLoadMore = () => {
    if (!loading) {
      if (storeCreditTransactions.length !== totalCount) {
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
    await setRefreshing(true);
    await setStoreCreditTransactions([]);
    const queryVariablesTmp = {
      ...queryVariables,
      currentPage: 1,
    };
    await setCurrentPage(1);
    await setNoMoreData(false);
    await setQueryVariables(queryVariablesTmp);
    await setRefreshing(false);
  };

  return (
    <Views
      storeCreditTransactions={storeCreditTransactions}
      currentBalance={currentBalance}
      onLoadMore={onLoadMore}
      loading={loading}
      noMoreData={noMoreData}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default withProfiler(StoreCredit, {name: 'StoreCredit'});
