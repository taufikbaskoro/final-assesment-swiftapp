import React from 'react';
import AppBar from '@app/components/AppBar';
import RenderIf from '@app/components/RenderIf';
import RenderItemList from '@app/components/RenderItem';
import Text from '@app/components/Text';
import Section from '@app/components/Section';

import {formatDateOrder} from '@app/helpers/General';
import {Colors, Mixins} from '@app/styles';
import {withProfiler} from '@sentry/react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import {FlatList, RefreshControl} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

import styles from '@app/_modules/account_purchases_detail/styles';

// const ButtonPurchase = withProfiler(
//   ({label, onPress}) => {
//     return (
//       <Section onPress={onPress} style={styles.detailsButton}>
//         <Text white small bold>
//           {label}
//         </Text>
//       </Section>
//     );
//   },
//   {name: 'ButtonPurchase'},
// );

function PurchasesScreen({
  onNavigateToPdp,
  customerOrders,
  loading,
  onLoadMore,
  noMoreData,
  refreshing,
  onRefresh,
}) {
  const scheme = useColorScheme();

  const FooterElement = withProfiler(
    () => {
      if (loading) {
        return <ActivityIndicator />;
      }

      return (
        <Section centerChildren margin2>
          <RenderIf condition={noMoreData}>
            <Text>No More Data</Text>
          </RenderIf>
        </Section>
      );
    },
    {name: 'FooterElement'},
  );

  const OrderItem = withProfiler(
    ({item, index}) => {
      const evenRowColor = scheme === 'dark' ? Colors.BLACK : Colors.WHITE;
      const oddRowColor =
        scheme === 'dark' ? Colors.GRAY_DARK : Colors.GRAY_SMOOTH;
      const backgroundColor = index % 2 === 0 ? evenRowColor : oddRowColor;
      const orderNumber = item.order_number;
      return (
        <RenderItemList itemKey={index}>
          <Section
            backgroundColor={backgroundColor}
            alignCenter
            row
            spaceBetween
            hpadding2
            vpadding2>
            <Section alignStart backgroundColor={backgroundColor}>
              <Text bold>Order No.{item.order_number}</Text>
              <Text small>{formatDateOrder(item.created_at)}</Text>
              <Text style={styles.orderStatusText}>{item.status_label}</Text>
            </Section>
            <Section row backgroundColor={backgroundColor}>
              <Button
                mode="contained"
                onPress={() => onNavigateToPdp(orderNumber)}>
                Detail
              </Button>
            </Section>
          </Section>
        </RenderItemList>
      );
    },
    {name: 'OrderItem'},
  );

  return (
    <>
      <AppBar useBack title="Purchases" />
      <FlatList
        style={{width: Mixins.MAX_WIDTH, backgroundColor: Colors.WHITE}}
        data={customerOrders}
        renderItem={OrderItem}
        keyExtractor={item => item.order_number.toString()}
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
}

export default withProfiler(PurchasesScreen, {name: 'PurchaseScreen'});
