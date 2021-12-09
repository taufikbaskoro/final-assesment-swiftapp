import React from 'react';
import {Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {FlatList} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import ProductItem from '@app/components/_ProductItem';
import styles from '@app/components/AddonProductSlider/styles';

import NoData from '@app/components/NoData';

function ProductSliderViews({
  title,
  products,
  loading,
  onNavigateToProductDetail,
  onNavigateToProductList,
}) {
  const {t} = useTranslation();

  return (
    <Section centerChildren height={normalize(190)}>
      <Section
        width={Mixins.MAX_WIDTH}
        row
        spaceBetween
        hpadding
        vpadding
        style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Section onPress={onNavigateToProductList}>
          <Text style={styles.headerTitleRight}>{t('label.viewMore')}</Text>
        </Section>
      </Section>
      <RenderIf condition={loading}>
        <ActivityIndicator />
      </RenderIf>
      <RenderIf condition={!loading && products.length < 1}>
        <NoData />
      </RenderIf>
      <RenderIf condition={!loading}>
        <FlatList
          horizontal
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const getFinalPrice = item?.price_range?.maximum_price?.final_price;
            return (
              <ProductItem
                onPress={() => onNavigateToProductDetail(item.url_key)}
                key={item.url_key}
                keyImage={item.url_key}
                name={item?.name}
                image={item?.small_image?.url}
                currency={getFinalPrice.currency}
                price={getFinalPrice.value}
              />
            );
          }}
        />
      </RenderIf>
    </Section>
  );
}

export default ProductSliderViews;
