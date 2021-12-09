import React from 'react';
import {normalize} from '@app/styles/mixins';
import {FlatList, Image, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import Section from '@app/components/Section';
import RenderIf from '@app/components/RenderIf';
import FastImage from 'react-native-fast-image';

import styles from '@app/components/AddonCategorySlider/styles';

const CategorySliderViews = ({
  loading,
  categories,
  onNavigateToProductList,
}) => {
  return (
    <Section
      centerChildren
      height={normalize(110)}
      style={styles.mainContainer}>
      <RenderIf condition={loading}>
        <Section maxWidth centerChildren>
          <ActivityIndicator />
        </Section>
      </RenderIf>
      <RenderIf condition={!loading && categories?.length < 1}>
        <Section maxWidth centerChildren>
          <Text>This category have no category children</Text>
        </Section>
      </RenderIf>
      <RenderIf condition={!loading && categories?.length > 0}>
        <FlatList
          horizontal
          data={categories}
          style={styles.listContainer}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            if (item.level !== 2 || item.include_in_menu) {
              const imageSourceCondition = item.category_icon !== null;
              return (
                <Section
                  onPress={() => onNavigateToProductList(item.id)}
                  style={styles.categoryImageContainer}>
                  <RenderIf condition={imageSourceCondition}>
                    <FastImage
                      key={item.id}
                      style={styles.categoryImage}
                      source={{
                        uri: item.category_icon,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </RenderIf>
                  <RenderIf condition={!imageSourceCondition}>
                    <Image
                      source={require('@app/assets/images/placeholder.png')}
                      style={styles.categoryImage}
                    />
                  </RenderIf>
                  <Text style={styles.categoryTitle}>{item.name}</Text>
                </Section>
              );
            }
          }}
        />
      </RenderIf>
    </Section>
  );
};

export default CategorySliderViews;
