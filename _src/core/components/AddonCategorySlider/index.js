import React, {useEffect, useState} from 'react';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {navigateTo} from '@app/helpers/Navigation';
import {withProfiler} from '@sentry/react';
import {modules} from '@root/swift.config';
import {
  GET_CATEGORIES_BY_ID,
  GET_CATEGORIES_PARENTS,
} from '@app/components/AddonCategorySlider/services/schema';

import Views from '@app/components/AddonCategorySlider/views';

const CategorySlider = ({categoryId = null}) => {
  /**
   * ----------------------------------------- *
   * @constant
   * @summary collections constant
   * ----------------------------------------- *
   */
  const [query, setQuery] = useState(GET_CATEGORIES_PARENTS);
  const [queryVariables, setQueryVariables] = useState({});
  const {data, loading} = customUseQuery(query, {
    variables: queryVariables,
  });
  const [categories, setCategories] = useState([]);

  /**
   * ----------------------------------------- *
   * @dependency [categoryId]
   * @summary set query and variables when
   * category change
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (categoryId) {
      setQuery(GET_CATEGORIES_BY_ID);
      setQueryVariables({
        id: categoryId,
      });
    }
  }, [categoryId]);

  /**
   * ----------------------------------------- *
   * @dependency [data, loading]
   * @summary set category from remote
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (query === GET_CATEGORIES_BY_ID) {
      if (data?.category) {
        setCategories(data?.category.children);
      } else {
        setCategories(data?.categoryList[0].children);
      }
    } else {
      if (data) {
        setCategories(data?.categoryList[0].children);
      }
    }
  }, [data, loading]);

  /**
   * ----------------------------------------- *
   * @function onNavigateToProductList
   * @param {object} item
   * @summary navigate to product list
   * ----------------------------------------- *
   */
  const onNavigateToProductList = (categoryIdParam, categoryNameParam) => {
    navigateTo(modules.product_list.enable, modules.product_list.name, {
      variables: {
        type: 'category',
        categoryId: categoryIdParam,
        categoryName: categoryNameParam,
      },
    });
  };

  return (
    <Views
      loading={loading}
      categories={categories}
      onNavigateToProductList={onNavigateToProductList}
    />
  );
};

export default withProfiler(CategorySlider, {name: 'CategorySlider'});
