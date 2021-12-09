import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'react-native-appearance';
import {withProfiler} from '@sentry/react-native';
import {formatDateOrder} from '@app/helpers/General';
import {Colors, Mixins} from '@app/styles';
import {navigateTo} from '@app/helpers/Navigation';

import Button from '@app/components/Button';
import Appbar from '@app/components/AppBar';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Text from '@app/components/Text';

import styles from '@app/_modules/account_myreturn/styles';
import {modules} from '@root/swift.config';

function MyReturnScreen({
  customerReturns,
  loading,
  onLoadMore,
  noMoreData,
  refreshing,
  onRefresh,
}) {
  const scheme = useColorScheme();

  const ReturnsItem = ({item, index}) => {
    let evenRowbackgroundColor =
      scheme === 'dark' ? Colors.BLACK : Colors.WHITE;
    let oddRowbackgroundColor =
      scheme === 'dark' ? Colors.GRAY_DARK : Colors.GRAY_SMOOTH;
    let backgroundColor =
      index % 2 === 0 ? evenRowbackgroundColor : oddRowbackgroundColor;
    let order_number = item.order_number;
    let increment_id = item.increment_id;

    return (
      <Section
        row
        spaceBetween
        hpadding2
        maxWidth
        vpadding
        height={Mixins.normalize(100)}
        style={[{backgroundColor}]}>
        <Section flex alignStart backgroundColor={backgroundColor}>
          <Section row backgroundColor={backgroundColor} vmargin={5}>
            <Text bold>Return No.{item.increment_id}</Text>
            <Text xsmall>({formatDateOrder(item.order_date)})</Text>
          </Section>
          <Text>Items : </Text>
          {item.items.map(returnItem => (
            <Section row backgroundColor={backgroundColor}>
              <Text style={{paddingHorizontal: 5}}>{'\u2B24'}</Text>
              <Text style={{flexWrap: 'wrap'}}>{returnItem.name}</Text>
            </Section>
          ))}

          <Text style={{fontStyle: 'italic'}}>{item.status.name}</Text>
        </Section>
        <Section selfCenter backgroundColor={backgroundColor}>
          <Button
            label="Detail"
            styleProp={styles.detailsButton}
            textStyleProp={styles.detailsButtonText}
            onPress={() =>
              navigateTo(
                modules.account_myreturn_detail.enable,
                modules.account_myreturn_detail.name,
                {
                  order_number,
                  increment_id,
                },
              )
            }
          />
        </Section>
      </Section>
    );
  };

  const FooterElement = withProfiler(
    () => {
      if (loading) {
        return <ActivityIndicator />;
      }

      return (
        <Section maxWidth centerChildren vpadding2>
          <RenderIf condition={noMoreData}>
            <Text>No More Data</Text>
          </RenderIf>
        </Section>
      );
    },
    {name: 'FooterElement'},
  );

  return (
    <>
      <Appbar useBack title="My Return" />
      <FlatList
        style={{width: Mixins.MAX_WIDTH, backgroundColor: Colors.WHITE}}
        data={customerReturns}
        renderItem={ReturnsItem}
        keyExtractor={item => item.increment_id.toString()}
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

export default withProfiler(MyReturnScreen, {name: 'MyReturnScreen'});
