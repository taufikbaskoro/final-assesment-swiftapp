import RadioButton from '@app/components/RadioButton';
import Text from '@app/components/Text';
import Section from '@app/components/Section';
import RenderIf from '@app/components/RenderIf';

import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {withProfiler} from '@sentry/react-native';

import styles from '@app/_modules/product_detail/styles';

const BundleProduct = ({
  product,
  selectedOptions,
  setSelectedOptions,
  setBundleItemsCount,
}) => {
  useEffect(() => {
    if (product) {
      if (product.items) {
        setBundleItemsCount(product.items.length);
      }
    }
  }, [product]);

  const BundleItem = withProfiler(
    ({bundleItem}) => {
      return (
        <Section
          key={bundleItem.option_id}
          style={styles.bundleOptionContainer}>
          <Text>{bundleItem.title}</Text>
          {bundleItem.options.map(option => {
            const {type} = bundleItem;
            if (type === 'radio') {
              return (
                <BundleItemsOption
                  option={option}
                  bundleItemOptionId={bundleItem.option_id}
                />
              );
            }
          })}
        </Section>
      );
    },
    {name: 'BundleItem'},
  );

  const BundleItemsOption = withProfiler(
    ({bundleItemOptionId, option}) => {
      const checkSelectedStatus = optionId => {
        let found = false;
        selectedOptions.forEach(selectedOption => {
          if (
            selectedOption.id === bundleItemOptionId &&
            selectedOption.value[0] === optionId
          ) {
            found = true;
          }
        });
        return found;
      };

      const onSelectOptionItem = (bundleItemOptionIdParam, optionParam) => {
        let selectedOptionsTmp = selectedOptions.filter(selectedOption => {
          return !(selectedOption.id === bundleItemOptionId);
        });
        selectedOptionsTmp.push({
          id: bundleItemOptionIdParam,
          quantity: optionParam.quantity,
          value: [option.id],
        });
        setSelectedOptions(selectedOptionsTmp);
      };

      return (
        <Section style={styles.bundleOptionItemContainer}>
          <RadioButton
            selected={checkSelectedStatus(option.id)}
            onPress={() => onSelectOptionItem(bundleItemOptionId, option)}
          />
          <FastImage
            key={option.product.name}
            style={styles.bundleOptionItemImage}
            source={{
              uri: option.product.thumbnail.url,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text>{option.product.name}</Text>
        </Section>
      );
    },
    {name: 'BundleItemsOption'},
  );

  return (
    <RenderIf condition={product.__typename === 'BundleProduct'}>
      <Section style={{marginHorizontal: 20, marginTop: 20}}>
        {product.items.map(bundleItem => {
          return <BundleItem bundleItem={bundleItem} />;
        })}
      </Section>
    </RenderIf>
  );
};

export default withProfiler(BundleProduct, {name: 'BundleProduct'});
