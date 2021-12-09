import React from 'react';
import {useQuery} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {navigateTo} from '@app/helpers/Navigation';
import {
  GET_CATEGORIES,
  GET_CATEGORIES_VES_MENU,
} from '@app/_modules/main_categories/services/schema';

import Config from 'react-native-config';
import Views from '@app/_modules/main_categories/_view';
import {modules} from '@root/swift.config';

const Categories = () => {
  if (!modules.main_categories.enable) {
    return null;
  }

  const {data, loading} = useQuery(
    Config.IS_VESMENU ? GET_CATEGORIES_VES_MENU : GET_CATEGORIES,
  );

  const onPressCategory = (categoryId, categoryName) => {
    navigateTo(modules.product_list.enable, modules.product_list.name, {
      type: 'category',
      categoryId,
      categoryName,
    });
  };

  return (
    <Views
      vesMenu={Config.IS_VESMENU}
      onPress={onPressCategory}
      loading={loading}
      categories={Config.IS_VESMENU ? data?.vesMenu : data?.categoryList[0]}
      onPressCategory={onPressCategory}
    />
  );
};

export default withProfiler(Categories, {name: 'Categories'});
