import React from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

import FastImage from 'react-native-fast-image';
import Appbar from '@app/components/AppBar';
import Section from '@app/components/Section';
import Text from '@app/components/Text';
import Button from '@app/components/Button';

const WishlistScreen = ({
  wishlist,
  onNavigateToProductDetail,
  onNavigateToAccount,
  userType,
}) => {
  const renderItem = ({item}) => {
    return (
      <Section
        padding
        border
        radius
        flex={0.5}
        width={Mixins.MAX_WIDTH / 2}
        centerChildren
        vmargin
        hmargin
        onPress={() => onNavigateToProductDetail(item.url_key)}>
        {item.image ? (
          <FastImage
            key={item.url_key}
            style={{
              height: normalize(180),
              width: Mixins.MAX_WIDTH / 2 - 30,
            }}
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: item.image,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
          />
        ) : (
          <Section
            style={{
              height: normalize(180),
              width: Mixins.MAX_WIDTH / 2 - 30,
              backgroundColor: Colors.GRAY_LIGHT,
            }}
          />
        )}
        <Text small center>
          {item.name}
        </Text>
      </Section>
    );
  };

  if (userType === 'guest') {
    return (
      <Section flex>
        <NavBar useBack title="Wish List" />
        <Section centerChildren flex maxWidth>
          <Text style={{marginBottom: 20}}>Please Login First</Text>
          <Button label="Go to Login" onPress={onNavigateToAccount} />
        </Section>
      </Section>
    );
  } else {
    return (
      <FlatList
        ListHeaderComponent={<Appbar useBack title="WishList" />}
        ListHeaderComponentStyle={{
          marginBottom: normalize(20),
        }}
        numColumns={2}
        style={{width: Mixins.MAX_WIDTH}}
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={item => item.wishlistId.toString()}
        ListEmptyComponent={
          wishlist ? <Text center>No data</Text> : <ActivityIndicator />
        }
      />
    );
  }
};

export default withProfiler(WishlistScreen, {name: 'WishlistScreen'});
