import React, {useEffect, useState} from 'react';
import {withProfiler} from '@sentry/react-native';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {GET_CUSTOMER_REWARD_POINTS} from '@app/_modules/account_rewardpoint/services/schema';

import Views from '@app/_modules/account_rewardpoint/_view';
import {modules} from '@root/swift.config';

const RewardPoints = () => {
  if (!modules.account_rewardpoint.enable) {
    return null;
  }

  const [rewardPointsTransactions, setRewardPointsTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [queryVariables, setQueryVariables] = useState({
    pageSize: 6,
    currentPage: 1,
  });
  const {data: rewardPointsTransactionsData, loading} = customUseQuery(
    GET_CUSTOMER_REWARD_POINTS,
    {
      variables: queryVariables,
    },
  );

  useEffect(() => {
    if (rewardPointsTransactionsData) {
      const {balance, balanceCurrency} =
        rewardPointsTransactionsData.customerRewardPoints;
      setCurrentBalance({
        currency: balanceCurrency,
        value: balance,
      });

      const {items, total_count} =
        rewardPointsTransactionsData.customerRewardPoints.transaction_history;
      const currentData = rewardPointsTransactions;
      const newData = [...currentData, ...items];
      setRewardPointsTransactions(newData);
      setTotalCount(total_count);
    }
  }, [rewardPointsTransactionsData]);

  const onLoadMore = () => {
    if (!loading) {
      if (rewardPointsTransactions.length !== totalCount) {
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
    await setRewardPointsTransactions([]);
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
      rewardPointsTransactions={rewardPointsTransactions}
      currentBalance={currentBalance}
      onLoadMore={onLoadMore}
      loading={loading}
      noMoreData={noMoreData}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default withProfiler(RewardPoints, {name: 'RewardPoints'});
