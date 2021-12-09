import React from 'react';
import {FlatList, Image} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {useTranslation} from 'react-i18next';

import FastImage from 'react-native-fast-image';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';

import styles from '@app/components/AddonBrandSlider/styles';

const BrandSliderViews = ({brands, loading, onNavigateToProductList}) => {
  const {t} = useTranslation();
  return (
    <Section height={normalize(140)} centerChildren>
      <Section row spaceBetween width={Mixins.MAX_WIDTH} hpadding>
        <Text style={styles.headerText}>{t('label.shopByBrand')}</Text>
      </Section>
      <RenderIf condition={loading}>
        <ActivityIndicator />
      </RenderIf>
      <RenderIf condition={!loading}>
        <FlatList
          horizontal
          data={brands}
          keyExtractor={item => item.attribute_id.toString()}
          renderItem={({item}) => {
            const imageSourceCondition =
              item.logo !== null && item.logo !== '' && item.logo !== undefined;
            return (
              <Section
                onPress={() =>
                  onNavigateToProductList(item.attribute_id, item.name)
                }
                style={styles.brandIconContainer}>
                <RenderIf condition={imageSourceCondition}>
                  <FastImage
                    key={item.attribute_id}
                    style={styles.brandIconImage}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{
                      uri: item.logo,
                      priority: FastImage.priority.normal,
                      cache: FastImage.cacheControl.immutable,
                    }}
                  />
                </RenderIf>
                <RenderIf condition={!imageSourceCondition}>
                  <Image
                    source={require('@app/assets/images/placeholder.png')}
                    style={styles.brandIconImage}
                  />
                </RenderIf>
                <Text style={styles.brandIconTitle}>{item.name}</Text>
              </Section>
            );
          }}
        />
      </RenderIf>
    </Section>
  );
};
export default BrandSliderViews;
