import React, {useEffect, useState} from 'react';
import {GET_BRANDS} from '@app/components/AddonBrandSlider/services/schema';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

import Views from '@app/components/AddonBrandSlider/views';

const BrandSlider = () => {
  /**
   * ----------------------------------------- *
   * @constant
   * @summary collections constant
   * ----------------------------------------- *
   */
  const {data, loading} = customUseQuery(GET_BRANDS, {});
  const [brands, setBrands] = useState([]);

  /**
   * ----------------------------------------- *
   * @dependency [data, loading]
   * @summary set brand from remote
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (data) {
      setBrands(data.getBrandList.items);
    }
  }, [data, loading]);

  /**
   * ----------------------------------------- *
   * @function onNavigateToProductList
   * @param {object} item
   * @summary navigate to product list
   * ----------------------------------------- *
   */
  const onNavigateToProductList = (attribute_id, name) => {
    navigateTo(modules.product_list.enable, modules.product_list.name, {
      type: 'brand',
      attribute_id,
      categoryName: name,
    });
  };

  return (
    <Views
      brands={brands}
      loading={loading}
      onNavigateToProductList={onNavigateToProductList}
    />
  );
};

export default BrandSlider;
