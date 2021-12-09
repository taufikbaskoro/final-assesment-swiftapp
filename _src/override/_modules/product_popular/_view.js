import React, {useState, useEffect} from 'react';
import {withProfiler} from '@sentry/react-native';
import {View, FlatList, Image} from 'react-native';
import _ from 'lodash';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
import AppBar from '@app/components/AppBar';
import styles from '@app/_modules/product_popular/styles';

const Item = ({item}) => {
  let title = item.name.replace('&trade;', '');
  let image_url = item.image.url.replace('pwa-be', '-sprint');
  let price = item.price_range.maximum_price.final_price.value;
  let curr = item.price_range.maximum_price.final_price.currency;
  return (
    <View style={styles.productDisplay}>
      <Text style={styles.productTitle}>{title}</Text>
      <Image style={styles.img} source={{uri: image_url}} />
      <Text style={styles.caption}>
        {curr}. {price}
      </Text>
    </View>
  );
};

const Views = ({t, get_products}) => {
  const theme = useTheme();
  const {background} = _.get(theme, 'colors');
  const [products, setProducts] = useState(null);

  const {loading, error, data} = get_products();

  useEffect(() => {
    setProducts(data && data.categoryList[0].products.items);
    // console.log(products)
  }, [loading]);

  // if(loading) return <Text>Loading...</Text>

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
      <AppBar useBack title="Product Popular" />
      <Text style={[styles.title, styles.marginVertical]}>
        Our Popular Products
      </Text>
      <FlatList
        contentContainerStyle={styles.mainContainer}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        numColumns={2}
      />
    </SafeAreaView>
    // <Text>Hello</Text>
  );
};

export default withProfiler(Views, {name: 'PopularProduct'});
