import React, {useEffect} from 'react';

import Text from '@app/components/Text';
import Section from '@app/components/Section';
import {Mixins, Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

import {StyleSheet} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import {withProfiler} from '@sentry/react-native';

const ConfigurableOptions = ({
  product,
  setSku,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
}) => {
  const scheme = useColorScheme();

  //issue : if selectedSize & color state is placed inside this component -> after rerender selectedColor & size reset to null
  useEffect(() => {
    if (selectedSize && selectedColor) {
      product?.variants?.map(variant => {
        if (
          variant.product.sku ===
            [product.sku, selectedSize, selectedColor].join('-') ||
          variant.product.sku ===
            [product.sku, selectedColor, selectedSize].join('-')
        ) {
          setSku(variant.product.sku);
        }
      });
    }
  }, [selectedColor, selectedSize]);

  const selectedBorder =
    scheme === 'dark' ? 'rgba(255,255,255, 0.7)' : 'rgba(0,0,0, 0.7)';
  const unselectedBorder =
    scheme === 'dark' ? 'rgba(255,255,255, 0.4)' : 'rgba(0,0,0, 0.4)';

  if (product.__typename === 'ConfigurableProduct') {
    const configurableOptions = product.configurable_options;
    return (
      <Section vmargin>
        {configurableOptions.map(option => {
          return (
            <Section key={option.id} alignStart>
              <Text
                style={{
                  paddingHorizontal: normalize(20),
                  marginTop: normalize(5),
                  fontSize: normalize(16),
                }}>
                {option.attribute_code}
              </Text>
              <Section row width={Mixins.MAX_WIDTH} hpadding2 vmargin={5}>
                {option.values.map((item, index) => {
                  if (option.attribute_code === 'color') {
                    const iconColor = {
                      backgroundColor: item.label.toString().toLowerCase(),
                    };
                    if (!selectedColor && index === 0) {
                      setSelectedColor(item.label);
                    }
                    return (
                      <Section
                        key={item.label}
                        centerChildren
                        hmargin
                        radius={25}
                        onPress={() => {
                          setSelectedColor(item.label);
                        }}
                        style={[
                          styles.swatchIconContainer,
                          iconColor,
                          {
                            borderColor:
                              item.label === selectedColor
                                ? selectedBorder
                                : unselectedBorder,
                          },
                        ]}
                      />
                    );
                  } else if (option.attribute_code === 'size') {
                    if (!selectedSize && index === 0) {
                      setSelectedSize(item.label);
                    }
                    return (
                      <Section
                        key={item.label}
                        centerChildren
                        hmargin
                        radius={25}
                        onPress={() => {
                          setSelectedSize(item.label);
                        }}
                        style={[
                          styles.swatchIconContainer,
                          {
                            borderColor:
                              item.label === selectedSize
                                ? selectedBorder
                                : unselectedBorder,
                          },
                        ]}>
                        <Text large color={Colors.GRAY_DARK}>
                          {item.label}
                        </Text>
                      </Section>
                    );
                  }
                })}
              </Section>
            </Section>
          );
        })}
      </Section>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  swatchIconContainer: {
    borderWidth: normalize(5),
    width: normalize(50),
    height: normalize(50),
  },
});

export default withProfiler(ConfigurableOptions, {name: 'ConfigurableOptions'});
