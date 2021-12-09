import React, {useEffect, useState} from 'react';
import {withProfiler} from '@sentry/react-native';

import {customUseQuery} from '@app/hooks/customApolloHooks';
import {GET_BANNER_SLIDER} from '@app/services/queries/banner';

import {
  GET_PRODUCTS_BY_BRAND,
  GET_PRODUCTS_BY_CATEGORIES,
} from '@app/_modules/product_detail/services/schema';
import Views from '@app/_modules/product_list/_view';
import {modules} from '@root/swift.config';

const ProductList = ({route}) => {
  if (!modules.product_list.enable) {
    return null;
  }

  /**
   * ----------------------------------------- *
   * @constant
   * @summary list of constant local state
   * ----------------------------------------- *
   */
  const {variables} = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const [query, setQuery] = useState(GET_PRODUCTS_BY_CATEGORIES);
  const [queryVariables, setQueryVariables] = useState(null);
  const [bannerSlider, setBannerSlider] = useState([]);
  const {data: bannerSliderData} = customUseQuery(GET_BANNER_SLIDER);
  const {data, loading} = customUseQuery(query, {
    variables: queryVariables,
  });

  /**
   * ----------------------------------------- *
   * @dependency [route]
   * @summary set initialize data
   * ----------------------------------------- *
   */
  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    setNoMoreData(false);
  }, [route]);

  /**
   * ----------------------------------------- *
   * @dependency [bannerSliderData]
   * @summary set banner slider from remote
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (bannerSliderData) {
      setBannerSlider(bannerSliderData.getHomepageSlider.images);
    }
  }, [bannerSliderData]);

  /**
   * ----------------------------------------- *
   * @dependency [variables]
   * @summary control query and queryVariables
   * based on product list to be displayed
   * (e.g. : by category, by brand, by search keyword)
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (variables) {
      let queryVariablesTmp = {};
      switch (variables?.type) {
        case 'brand':
          setQuery(GET_PRODUCTS_BY_BRAND);
          queryVariablesTmp = {
            attributeId: variables?.attribute_id,
          };
          break;
        case 'category':
          setQuery(GET_PRODUCTS_BY_CATEGORIES);
          queryVariablesTmp = {
            categoryId: variables?.categoryId,
          };
          break;
      }
      queryVariablesTmp = {
        ...queryVariablesTmp,
        currentPage: currentPage,
        pageSize: 6,
        sortBy: {price: 'ASC'},
      };
      setQueryVariables(queryVariablesTmp);
    }
  }, [variables]);

  /**
   * ----------------------------------------- *
   * @dependency [data]
   * @summary set product from remote and
   * set total all product
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (data) {
      const currentProducts = products;
      const newProducts = [...currentProducts, ...data.products.items];
      setProducts(newProducts);
      setTotalCount(data.products.total_count);
    }
  }, [data]);

  /**
   * ----------------------------------------- *
   * @function onLoadMore
   * @summary get more product from remote
   * ----------------------------------------- *
   */
  const onLoadMore = () => {
    if (!loading) {
      if (products.length !== data.products.total_count) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);

        const queryVariablesTmp = {
          ...queryVariables,
          currentPage: newPage,
        };
        setQueryVariables(queryVariablesTmp);
      } else {
        setNoMoreData(true);
      }
    }
  };

  /**
   * ----------------------------------------- *
   * @function onNavigateToProductDetail
   * @summary navigate to product detail
   * ----------------------------------------- *
   */
  const onNavigateToProductDetail = productUrlKey => {
    // navigateToProductDetail(navigation, productUrlKey);
  };

  return (
    <Views
      products={products}
      totalCount={totalCount}
      onLoadMore={onLoadMore}
      loading={loading}
      noMoreData={noMoreData}
      categoryId={variables?.categoryId}
      attributeId={variables?.attribute_id}
      categoryName={variables?.categoryName}
      onNavigateToProductDetail={onNavigateToProductDetail}
      bannerSlider={bannerSlider}
    />
  );
};

export default withProfiler(ProductList, {name: 'ProductList'});
