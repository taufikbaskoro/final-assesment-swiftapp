import React, {useRef, useState, useEffect} from 'react';
import {withProfiler} from '@sentry/react-native';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';
import {SEARCH_PRODUCTS} from '@app/components/AddonSearchBar/services/schema';

import useQueryCustom from '@root/_src/core/hooks/useCustomQuery';
import Views from '@app/_modules/main_search/_view';

const configSearchVariable = {
  currentPage: 1,
  pageSize: 7,
  sortBy: {price: 'ASC'},
};

let delayTimer;

const MainSearch = props => {
  /**
   * ---------------------------------------------------- *
   * @constant {hooks}
   * ---------------------------------------------------- *
   */
  const mount = useRef();
  const [searchText, setSearchText] = useState('');
  const {data, loading, onRefetchData} = useQueryCustom({
    schema: SEARCH_PRODUCTS,
  });

  /**
   * ---------------------------------------------------- *
   * @dependency []
   * @summary lifecycle
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    mount.current = true;
    return () => (mount.current = false);
  }, []);

  /**
   * ---------------------------------------------------- *
   * @function onSearchChange
   * @summary on search change text change
   * ---------------------------------------------------- *
   */
  const onSearchTextChange = text => {
    setSearchText(text);
    if (text === '') {
      clearTimeout(delayTimer);
    } else {
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => onPostSearch(text), 1000);
    }
  };

  /**
   * ---------------------------------------------------- *
   * @function onPostSearch
   * @summary on search change text change
   * ---------------------------------------------------- *
   */
  const onPostSearch = async text => {
    await onRefetchData({
      params: {
        ...configSearchVariable,
        search: text,
      },
    });
  };

  /**
   * ---------------------------------------------------- *
   * @function onNavigateProductDetail
   * @summary go to product detail
   * ---------------------------------------------------- *
   */
  const onNavigateProductDetail = item => {
    navigateTo(modules.product_detail.enable, modules.product_detail.name, {
      productUrlKey: item.url_key,
    });
  };
  /**
   * ---------------------------------------------------- *
   * @constant controllerProps
   * @return {object}
   * ---------------------------------------------------- *
   */
  const controllerProps = {
    data,
    loading,
    searchText,
    setSearchText,
    onSearchTextChange,
    onNavigateProductDetail,
  };

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(MainSearch, {name: 'MainSearch'});
