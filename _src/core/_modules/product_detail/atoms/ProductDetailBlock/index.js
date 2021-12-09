import React, {useState} from 'react';
import {View} from 'react-native';
import {formatDateOrder} from '@app/helpers/General';
import {Colors, Mixins} from '@app/styles';
import {Text, Button, Colors as ColorsPaper} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {PRODUCT_TAB_DETAIL, PRODUCT_TAB_REVIEW} from '@app/helpers/Constants';
import {MixinsNew} from '@app/styles/index';
import {MAX_WIDTH} from '@app/styles/mixins';

import RenderIf from '@app/components/RenderIf/index';
import Section from '@app/components/Section/index';
import NoData from '@app/components/NoData/index';
import WebViewContent from '@app/components/WebViewContent/index';
import Icon from 'react-native-vector-icons/FontAwesome';

import AddReviewModal from '@app/_modules/product_detail/atoms/AddReviewModal';
import styles from '@app/_modules/product_detail/styles';

/**
 * ---------------------------------------------------- *
 * @profiler {ProductDescription} Sentry
 * @summary product description component with profiler
 * ---------------------------------------------------- *
 */
const ProductDescription = withProfiler(
  ({selected, product}) => {
    const getDescription = product?.description?.html;
    if (getDescription === '' && selected === 'details') {
      return <NoData />;
    }
    return (
      <RenderIf condition={selected === 'details'}>
        <WebViewContent
          htmlBlock={product.description?.html}
          contentFontSize={40}
          contentBackgroundColor={Colors.PRIMARY}
          contentTextColor={Colors.WHITE}
          styleProp={{backgroundColor: Colors.PRIMARY}}
        />
      </RenderIf>
    );
  },
  {name: 'ProductDescription'},
);

/**
 * ---------------------------------------------------- *
 * @profiler {ProductReview} Sentry
 * @summary product review component with profiler
 * ---------------------------------------------------- *
 */
const ProductReview = withProfiler(
  ({selected, product, productReviews, totalReview, refetchProductReviews}) => {
    const ratingDummyCounter = [0, 1, 2, 3, 4];
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const Ratings = ({ratings}) => {
      return (
        <Section row>
          {ratingDummyCounter.map(rating => {
            if (ratings[0].value > rating) {
              return <Icon name="star" size={16} color={Colors.PRIMARY} />;
            } else {
              return <Icon name="star-o" size={16} color={Colors.PRIMARY} />;
            }
          })}
        </Section>
      );
    };

    return (
      <RenderIf condition={selected === 'review'}>
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            width: MAX_WIDTH,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              ...MixinsNew.padding({top: 15, bottom: 15, left: 25, right: 25}),
            }}>
            <Text style={{color: Colors.WHITE, width: '50%'}}>
              Customer Reviews
            </Text>
            <Text
              style={{
                color: Colors.WHITE,
                width: '50%',
                textAlign: 'right',
              }}>
              {totalReview} Reviews
            </Text>
          </View>

          {productReviews.map(review => {
            return (
              <Section
                keyIndex={review.id}
                padding={15}
                radius
                vmargin
                border={Colors.PRIMARY}>
                <Section
                  width={Mixins.MAX_WIDTH * 0.75}
                  row
                  spaceBetween
                  alignCenter
                  vmargin={5}>
                  <Section alignStart>
                    <Text bold>{review.nickname}</Text>
                    <Text small>{formatDateOrder(review.created_at)}</Text>
                  </Section>
                  <Ratings ratings={review.ratings} />
                </Section>
                <Text>{review.detail}</Text>
              </Section>
            );
          })}

          <RenderIf condition={productReviews.length < totalReview}>
            <Button label="Read More Reviews" styleProp={{borderWidth: 0}} />
          </RenderIf>

          <Section transparent>
            <Button
              key={'pdp-detail'}
              mode="contained"
              onPress={() => setShowAddReviewModal(true)}
              style={{
                backgroundColor: ColorsPaper.grey100,
                ...MixinsNew.margin({right: 25, bottom: 20}),
              }}>
              <Text
                style={{
                  color: Colors.PRIMARY,
                }}>
                Write a Review
              </Text>
            </Button>
          </Section>
        </View>
        <AddReviewModal
          showAddReviewModal={showAddReviewModal}
          setShowAddReviewModal={setShowAddReviewModal}
          product={product}
          refetchProductReviews={refetchProductReviews}
        />
      </RenderIf>
    );
  },
  {name: 'ProductReview'},
);

const ProductDetailBlock = ({
  product,
  productReviews,
  totalReview,
  refetchProductReviews,
}) => {
  /**
   * ---------------------------------------------------- *
   * @const {hooks}
   * ---------------------------------------------------- *
   */
  const [selected, setSelected] = useState(null);
  const isSelectedDetail = selected === PRODUCT_TAB_DETAIL;
  const isSelectedReview = selected === PRODUCT_TAB_REVIEW;
  const fontWeightDetail = isSelectedDetail ? {fontWeight: 'bold'} : {};
  const fontWeightReview = isSelectedReview ? {fontWeight: 'bold'} : {};
  return (
    <>
      <Section hmargin2 row style={styles.headerContainer}>
        <Button
          key={'pdp-detail'}
          mode="contained"
          onPress={() => setSelected(PRODUCT_TAB_DETAIL)}
          style={[
            styles.btnCategory,
            {
              backgroundColor: isSelectedDetail
                ? Colors.PRIMARY
                : ColorsPaper.grey300,
              ...MixinsNew.borderRadius({
                topRight: 0,
                bottomRight: 0,
                bottomLeft: 0,
              }),
            },
          ]}>
          <Text
            style={{
              color: isSelectedDetail ? ColorsPaper.white : ColorsPaper.grey500,
              ...fontWeightDetail,
            }}>
            Detail
          </Text>
        </Button>
        <Button
          key={'pdp-review'}
          mode="contained"
          onPress={() => setSelected(PRODUCT_TAB_REVIEW)}
          style={[
            styles.btnCategory,
            {
              backgroundColor: isSelectedReview
                ? Colors.PRIMARY
                : ColorsPaper.grey300,
              ...MixinsNew.borderRadius({
                topLeft: 0,
                bottomLeft: 0,
                bottomRight: 0,
              }),
            },
          ]}>
          <Text
            style={{
              color: isSelectedReview ? ColorsPaper.white : ColorsPaper.grey500,
              ...fontWeightReview,
            }}>
            Review
          </Text>
        </Button>
      </Section>
      <ProductDescription selected={selected} product={product} />
      <ProductReview
        selected={selected}
        product={product}
        productReviews={productReviews}
        totalReview={totalReview}
        refetchProductReviews={refetchProductReviews}
      />
    </>
  );
};

export default withProfiler(ProductDetailBlock, {name: 'ProductDetailBlock'});
