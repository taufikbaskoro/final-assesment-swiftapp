import React from 'react';
import {Mixins} from '@app/styles';
import {ScrollView} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BannerSlider from '@app/components/BannerSlider';
import CategorySlider from '@app/components/AddonCategorySlider';
import ProductSlider from '@app/components/AddonProductSlider';
import BrandSlider from '@app/components/AddonBrandSlider';
import Blog from '@app/components/Blog';
import NavBar from '@app/components/NavBar';
import Divider from '@app/components/Divider';
import AtomNavBarRight from '@app/_modules/main_home/atoms/NavBarRight';

import styles from '@app/_modules/main_home/styles';

const HomeScreen = ({bannerSlider, onNavigateTrackOrder}) => {
  return (
    <SafeAreaView>
      <NavBar
        useLogo
        childrenRight={
          <AtomNavBarRight onNavigateTrackOrder={onNavigateTrackOrder} />
        }
      />
      <ScrollView contentContainerStyle={styles.containerScroll}>
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
    </SafeAreaView>
  );
};

export default withProfiler(HomeScreen, {name: 'HomeScreen'});
