import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'react-native-appearance';
import {withProfiler} from '@sentry/react-native';
import {formatDateOrder, numberFormat} from '@app/helpers/General';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

import Appbar from '@app/components/AppBar';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Text from '@app/components/Text';

const StoreCreditScreen = ({
  storeCreditTransactions,
  currentBalance,
  loading,
  onLoadMore,
  noMoreData,
  refreshing,
  onRefresh,
}) => {
  const scheme = useColorScheme();

  const CurrentBalance = withProfiler(
    ({currentBalance: currentBalanceParam}) => {
      if (!currentBalanceParam) {
        return (
          <Section backgroundColor={Colors.PRIMARY} padding2 alignStart>
            <ActivityIndicator color={Colors.WHITE} />
          </Section>
        );
      }
      return (
        <Section backgroundColor={Colors.PRIMARY} padding2 alignStart>
          <Text bold white>
            Your Current Balance{' '}
            {numberFormat(
              currentBalanceParam.currency,
              currentBalanceParam.value,
            )}
          </Text>
        </Section>
      );
    },
    {name: 'CurrentBalance'},
  );

  const FooterElement = withProfiler(
    () => {
      return (
        <>
          <RenderIf condition={loading}>
            <Section margin2 centerChildren>
              <ActivityIndicator />
            </Section>
          </RenderIf>
          <RenderIf condition={!loading}>
            <Section margin2>
              <RenderIf condition={noMoreData}>
                <Text>No More Data</Text>
              </RenderIf>
            </Section>
          </RenderIf>
        </>
      );
    },
    {name: 'FooterElement'},
  );

  const TransactionItem = withProfiler(
    ({item, index}) => {
      const adjustmentText =
        item.store_credit_adjustment.value < 0
          ? `-${numberFormat(
              item.store_credit_adjustment.currency,
              item.store_credit_adjustment.value,
            )}`
          : `+${numberFormat(
              item.store_credit_adjustment.currency,
              item.store_credit_adjustment.value,
            )}`;

      let evenRowColor = scheme === 'dark' ? Colors.BLACK : Colors.WHITE;
      let oddRowColor =
        scheme === 'dark' ? Colors.GRAY_DARK : Colors.GRAY_SMOOTH;
      const backgroundColor = index % 2 === 1 ? evenRowColor : oddRowColor;

      return (
        <Section
          backgroundColor={backgroundColor}
          row
          hpadding2
          height={normalize(100)}>
          <Section
            centerChildren
            height={normalize(100)}
            width={normalize(50)}
            vpadding={15}
            backgroundColor={backgroundColor}>
            <Text>{item.transaction_id}</Text>
          </Section>
          <Section
            height={normalize(100)}
            vpadding={15}
            alignStart
            centerChildren
            backgroundColor={backgroundColor}>
            <Text bold>{adjustmentText}</Text>
            <Text>{item.comment}</Text>
            <Text>{formatDateOrder(item.transaction_date_time)}</Text>
          </Section>
        </Section>
      );
    },
    {name: 'TransactionItem'},
  );

  return (
    <>
      <Appbar useBack title="Store Credit &amp; Refund" />
      <CurrentBalance currentBalance={currentBalance} />
      <FlatList
        style={{width: Mixins.MAX_WIDTH}}
        data={storeCreditTransactions}
        renderItem={TransactionItem}
        keyExtractor={item => item.transaction_id.toString()}
        ListFooterComponent={FooterElement}
        ListFooterComponentStyle={{alignSelf: 'center'}}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};

export default withProfiler(StoreCreditScreen, {name: 'StoreCreditScreen'});
