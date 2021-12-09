import React from 'react';

import {useTranslation} from 'react-i18next';
import {withProfiler} from '@sentry/react-native';
import {modules} from '@root/swift.config';

import useNavAuthInitialize from '@root/_src/core/hooks/_useNavAuthInitialize';
import Views from '@app/_modules/product_popular/_view';
import {useQuery} from '@apollo/client';
import {GET_POPULAR_PRODUCTS} from '@app/_modules/product_popular/services/schema';

const Controller = props => {
  if (!modules.product_popular.enable) {
    return null;
  }

  /**
   * ---------------------------------------------------- *
   * @function useNavAuthInitialize
   * @summary this use for initialize top of stack auth
   * ---------------------------------------------------- *
   */
  useNavAuthInitialize();

  /**
   * ---------------------------------------------------- *
   * @constant controllerProps
   * @summary collections constant for
   * this contorller
   * ---------------------------------------------------- *
   */
  const {t} = useTranslation();

  const get_products = () => useQuery(GET_POPULAR_PRODUCTS);

  const controllerProps = {
    t,
    get_products,
  };

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(Controller, {name: 'PopularController'});
