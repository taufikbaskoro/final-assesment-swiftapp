import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useQuery} from '@apollo/client';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {GET_CATEGORYID_BYURL} from '@app/services/queries/banner';
import {Colors, Mixins} from '@app/styles';
import {useColorScheme} from 'react-native-appearance';
import {withProfiler} from '@sentry/react-native';
import {navigateTo} from '@app/helpers/Navigation';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import Section from '@app/components/Section';
import FastImage from 'react-native-fast-image';

import styles from '@app/components/BannerSlider/styles';
import {modules} from '@root/swift.config';

/**
 * ----------------------------------------- *
 * @function RenderImage
 * @param {object} item
 * @summary load image using items attribute
 * @return FastImage
 * ----------------------------------------- *
 */
const RenderImage = ({keyIndex, imageSource, onError, onLoadEnd}) => (
  <FastImage
    key={keyIndex.toString()}
    style={styles.sliderImage}
    onError={onError}
    onLoadEnd={onLoadEnd}
    resizeMode={FastImage.resizeMode.contain}
    source={{
      uri: imageSource,
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.immutable,
    }}
  />
);

const BannerSlider = ({
  style,
  styleFrame,
  data,
  clickable,
  autoplay = false,
  autoplayInterval = 3000,
}) => {
  /**
   * ----------------------------------------- *
   * @constant
   * @summary collections constant
   * ----------------------------------------- *
   */
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderWidth = Mixins.MAX_WIDTH;
  const itemWidth = Mixins.MAX_WIDTH;
  const noImageSource = require('@app/assets/images/placeholder.png');

  /**
   * ----------------------------------------- *
   * @function _onImageBannerLoadEnd
   * @summary stop loading when load end
   * ----------------------------------------- *
   */
  const _onImageBannerLoadEnd = () => {
    setLoading(false);
  };

  /**
   * ----------------------------------------- *
   * @function _onImageBannerError
   * @summary stop loading when banner error
   * ----------------------------------------- *
   */
  const _onImageBannerError = () => {
    setLoading(false);
  };

  /**
   * ----------------------------------------- *
   * @function ItemImage
   * @param {object} item
   * @summary load sinle item
   * @return Component
   * ----------------------------------------- *
   */
  const ItemImage = ({item, index}) => {
    /**
     * ----------------------------------------- *
     * @constant
     * @summary collections constant for
     * this function
     * ----------------------------------------- *
     */
    let splitUrlArray = item.url_redirection.split('/');
    const url = splitUrlArray[splitUrlArray.length - 1];

    const [categoryId, setCategoryId] = useState(null);
    const [, setCategoryName] = useState('');
    const {data: categoryIdData} = useQuery(GET_CATEGORYID_BYURL, {
      variables: {url},
    });

    /**
     * ----------------------------------------- *
     * @dependency [categoryIdData]
     * @summary onvert url to id
     * category id data change
     * ----------------------------------------- *
     */
    useEffect(() => {
      if (categoryIdData) {
        setCategoryId(categoryIdData?.categoryList[0]?.id);
        setCategoryName(categoryIdData?.categoryList[0]?.name);
      }
    }, [categoryIdData]);

    /**
     * ----------------------------------------- *
     * @condition
     * @summary handle broken image
     * ----------------------------------------- *
     */
    const image_url = item.image_url;
    const imageSource =
      image_url !== null || image_url !== undefined || image_url !== ''
        ? image_url
        : noImageSource;

    /**
     * ----------------------------------------- *
     * @condition
     * @summary type of image
     * ----------------------------------------- *
     */
    if (clickable) {
      return (
        <Section
          onPress={() => {
            navigateTo(modules.product_list.enable, modules.product_list.name, {
              variables: {
                type: 'category',
                categoryId: categoryId,
              },
            });
          }}>
          <RenderImage
            keyIndex={item.image_id}
            imageSource={imageSource}
            onError={_onImageBannerError}
            onLoadEnd={_onImageBannerLoadEnd}
          />
        </Section>
      );
    } else {
      return (
        <RenderImage
          keyIndex={item.image_id}
          imageSource={imageSource}
          onError={_onImageBannerError}
          onLoadEnd={_onImageBannerLoadEnd}
        />
      );
    }
  };

  /**
   * ----------------------------------------- *
   * @function renderBannerImage
   * @dependency [data]
   * @summary render banner's image
   * @return {object} ItemImage
   * ----------------------------------------- *
   */
  const renderBannerImage = useCallback(
    (item, index) => {
      return <ItemImage item={item} index={index} />;
    },
    [data],
  );

  /**
   * ----------------------------------------- *
   * @function _renderItem
   * @param {object} item
   * @summary load single item
   * @return Component
   * ----------------------------------------- *
   */
  const _renderItem = ({item, index}) => {
    return (
      <View
        style={[
          {backgroundColor: scheme === 'dark' ? Colors.BLACK : Colors.WHITE},
          styles.sliderFrame,
        ]}>
        {renderBannerImage(item, index)}
      </View>
    );
  };

  /**
   * ----------------------------------------- *
   * @constant rendering
   * @dependency [loading, data, activeSlide]
   * @summary load banner slider
   * @return Sections
   * ----------------------------------------- *
   */
  const rendering = useMemo(() => {
    if (data.length < 1) {
      return (
        <Section
          style={[
            styleFrame,
            {
              height: Mixins.MAX_HEIGHT * 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color={Colors.PRIMARY} />
        </Section>
      );
    } else {
      return (
        <Section style={style}>
          <Carousel
            loop
            autoplay={autoplay}
            autoplayDelay={autoplayInterval}
            autoplayInterval={autoplayInterval}
            enableMomentum={false}
            lockScrollWhileSnapping
            data={data}
            renderItem={_renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            containerStyle={styles.sliderPaginationStyles}
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            dotStyle={styles.sliderPaginationDot}
            inactiveDotStyle={styles.sliderPaginationDotInactive}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            dotContainerStyle={{
              marginHorizontal: data.length < 15 ? 5 : 1,
            }}
          />
        </Section>
      );
    }
  }, [loading, data, activeSlide]);

  return <View style={[styleFrame]}>{rendering}</View>;
};

export default withProfiler(BannerSlider, {name: 'BannerSlider'});
