import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {useTranslation} from 'react-i18next';
import {TOTAL_PRICE_BLOCK} from '@app/helpers/Constants';
import {modules} from '@root/swift.config';
import {TOTAL_DISCOUNT} from '@app/helpers/Constants';

import RenderIf from '@app/components/RenderIf';
import CustomView from '@app/components/CustomView/index';
import Text from '@app/components/Text';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * ---------------------------------------------------- *
 * @component {Total Price Block}
 * @summary return component Total Price Block
 * ---------------------------------------------------- *
 */
const TotalPriceBlock = ({
  dataPrices,
  selectedShippingMethod,
  dataExtraFee,
  dataAppliedStoreCredit,
  aplliedRewardPoints,
  appliedGiftCard,
}) => {
  const {t} = useTranslation();
  const [prices, setPrices] = useState(null);
  const [showModalDiscounts, setShowModalDiscounts] = useState(false);

  /**
   * ----------------------------------------- *
   * @dependency [
   * dataPrices,
   * selectedShippingMethod,
   * dataExtraFee,
   * dataAppliedStoreCredit,
   * aplliedRewardPoints,
   * appliedGiftCard,
   * ]
   * @summary populate new prices when data changes
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    if (dataPrices) {
      populateNewPrices();
    }
  }, [
    dataPrices,
    selectedShippingMethod,
    dataExtraFee,
    dataAppliedStoreCredit,
    aplliedRewardPoints,
    appliedGiftCard,
  ]);

  /**
   * ---------------------------------------------------- *
   * @funtion populateNewPrices
   * @summary populate data price to single item
   * @todo display applied gift card
   * ---------------------------------------------------- *
   */
  const populateNewPrices = () => {
    let priceData = [];
    priceData.push({
      title: t('cart.total_price_block.label.subtotal'),
      value: modules.taxes.enable
        ? dataPrices?.subtotal_excluding_tax?.value
        : dataPrices?.subtotal_including_tax?.value,
    });
    if (selectedShippingMethod) {
      priceData.push({
        title: t('cart.total_price_block.label.shipping'),
        value: selectedShippingMethod?.amount,
      });
    }
    if (dataExtraFee) {
      priceData.push({
        title: dataExtraFee?.title,
        value: dataExtraFee?.extrafee_value.value,
      });
    }
    if (dataPrices?.discounts?.length > 0) {
      let totalDiscount = 0;
      dataPrices?.discounts.map(discountItem => {
        totalDiscount += discountItem.amount.value;
      });
      priceData.push({
        title: t('cart.total_price_block.label.totalDiscount'),
        value: totalDiscount,
        isNegativeNumber: true,
        isClickable: TOTAL_DISCOUNT,
      });
    }
    if (dataAppliedStoreCredit?.is_use_store_credit) {
      let valueStoreCredit = dataAppliedStoreCredit?.store_credit_amount;
      if (valueStoreCredit < 0) {
        valueStoreCredit *= -1;
      }
      priceData.push({
        title: t('cart.total_price_block.label.storeCredit'),
        value: valueStoreCredit,
        isNegativeNumber: true,
      });
    }
    if (aplliedRewardPoints?.is_use_reward_points) {
      let valueRewardPoints = aplliedRewardPoints?.reward_points_amount;
      if (valueRewardPoints < 0) {
        valueRewardPoints *= -1;
      }
      priceData.push({
        title: t('cart.total_price_block.label.rewardPoint'),
        value: valueRewardPoints,
        isNegativeNumber: true,
      });
    }

    if (appliedGiftCard?.giftcard_detail[0]?.giftcard_code) {
      let valueGiftCard =
        appliedGiftCard?.giftcard_detail[0]?.giftcard_amount_used;
      if (valueGiftCard < 0) {
        valueGiftCard *= -1;
      }
      priceData.push({
        title: `${t('cart.total_price_block.label.giftCard')} : ${
          appliedGiftCard?.giftcard_detail[0]?.giftcard_code
        }`,
        value: valueGiftCard,
        isNegativeNumber: true,
      });
    }
    if (modules.taxes.enable) {
      if (dataPrices?.applied_taxes?.length > 0) {
        let valueTaxes = dataPrices?.applied_taxes[0]?.amount?.value;
        priceData.push({
          title: t('cart.total_price_block.label.taxes'),
          value: valueTaxes,
        });
      }
    }
    priceData.push({
      title: t('cart.total_price_block.label.total'),
      value: dataPrices?.grand_total?.value,
    });
    setPrices(priceData);
  };

  /**
   * ---------------------------------------------------- *
   * @funtion onClickHandler
   * @summary on click handler for item can be clicked
   * ---------------------------------------------------- *
   */
  const onClickHandler = key => {
    if (key === TOTAL_DISCOUNT) {
      setShowModalDiscounts(true);
    }
  };

  if (prices) {
    return (
      <>
        <CustomView horizontal>
          {prices.map((price, index) => {
            return (
              <CustomView
                key={`${TOTAL_PRICE_BLOCK}-${price.title}-${index}`}
                row
                spaceBetween
                width={'100%'}
                plain>
                <RenderIf condition={price.isClickable}>
                  <TouchableOpacity
                    onPress={() => onClickHandler(price.isClickable)}>
                    <CustomView row plain>
                      <Text>{price.title}</Text>
                      <Icon
                        name="information-circle-outline"
                        size={16}
                        style={{marginLeft: 5}}
                      />
                    </CustomView>
                  </TouchableOpacity>
                </RenderIf>
                <RenderIf condition={!price.isClickable}>
                  <Text>{price.title}</Text>
                </RenderIf>
                <RenderIf condition={price.isNegativeNumber}>
                  <Text>(- IDR {price.value})</Text>
                </RenderIf>
                <RenderIf condition={!price.isNegativeNumber}>
                  <Text>IDR {price.value}</Text>
                </RenderIf>
              </CustomView>
            );
          })}
        </CustomView>

        <Modal
          visible={showModalDiscounts}
          transparent
          onRequestClose={() => setShowModalDiscounts(false)}>
          <CustomView backgroundColor={'rgba(0, 0, 0, 0.6)'} flex />
          <CustomView backgroundColor="white" row spaceBetween doubleHorizontal>
            <CustomView small>
              <Text>List Discount</Text>
            </CustomView>
            <TouchableOpacity
              onPress={() => {
                setShowModalDiscounts(false);
              }}>
              <CustomView small>
                <Text xlarge>x</Text>
              </CustomView>
            </TouchableOpacity>
          </CustomView>
          <CustomView backgroundColor="white" doubleHorizontal>
            {dataPrices?.discounts?.map(discountItem => {
              return (
                <CustomView row spaceBetween small>
                  <Text>{discountItem.label}</Text>
                  <Text>
                    {`${discountItem.amount.currency} ${discountItem.amount.value}`}
                  </Text>
                </CustomView>
              );
            })}
          </CustomView>
        </Modal>
      </>
    );
  } else {
    return <ActivityIndicator />;
  }
};

export default React.memo(
  withProfiler(TotalPriceBlock, {name: 'TotalPriceBlock'}),
);
