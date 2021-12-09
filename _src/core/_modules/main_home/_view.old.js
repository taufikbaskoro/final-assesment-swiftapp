/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Mixins} from '@app/styles';
import {ScrollView} from 'react-native';
import {withProfiler} from '@sentry/react-native';

import BannerSlider from '@app/components/BannerSlider';
import Blog from '@app/components/Blog';
import Section from '@app/components/Section';
import Divider from '@app/components/Divider';
import BrandSlider from '@app/components/AddonBrandSlider';
import CategorySlider from '@app/components/AddonCategorySlider';
import ProductSlider from '@app/components/AddonProductSlider';
import NavBarHome from '@app/components/NavBarHome';

function HomeScreen({bannerSlider}) {
  return (
    <Section flex>
      <NavBarHome />
      <Section flex centerChildren>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <BannerSlider
            autoplay={true}
            data={bannerSlider}
            clickable={true}
            styleFrame={{
              width: Mixins.MAX_WIDTH,
              alignSelf: 'center',
              flex: 1,
            }}
          />

          <CategorySlider />
          <Divider />

          <ProductSlider categoryId={44} title="Home" />
          <Divider />

          <BrandSlider />
          <Divider />

          <ProductSlider categoryId={12} title="Men Tops" />
          <Divider />

          <ProductSlider categoryId={3} title="Gear" />
          <Divider />
          <Blog />
        </ScrollView>
      </Section>
    </Section>
  );
}

export default withProfiler(HomeScreen, {name: 'HomeScreen'});
