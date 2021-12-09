import {useEffect} from 'react';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {handleError} from '@app/helpers/Auth';
// import {rxAppSnackbar} from '@app/services/cache';
import {useCartId} from '@app/hooks/useCartId';

export function customUseQuery(schema, options) {
  const {getEmptyCart: resetCart} = useCartId();
  // const [skip, setSkip] = useState(false);
  const variablesData = options && options.variables;
  const fetchPolicyData = options && options.fetchPolicy;

  const {data, loading, error, refetch, fetchMore} = useQuery(schema, {
    variables: variablesData,
    fetchPolicy: fetchPolicyData,
  });

  if (error) {
    console.log('[err] schema', schema);
    console.log('[err] query', error);
    if (error.graphQLErrors[0]) {
      const {message} = error.graphQLErrors[0];
      // prettier-ignore
      const isNotCartActive = message.includes('Current user does not have an active cart');
      // prettier-ignore
      // const isNotCartPerform = message.includes('The current user cannot perform operations on cart');
      // prettier-ignore
      // const isNotAuthorized = message.includes('The current customer isn\'t authorized.');

      if (isNotCartActive) {
        resetCart();
      }

      // if (isNotCartPerform || isNotAuthorized) {
      // let messageSnack = 'Your session has expired, please login again.';
      // setSkip(true);
      // rxAppSnackbar({message: messageSnack});
      // signOut();
      // }
    }
  }

  return {data, loading, error, refetch, fetchMore};
}

export function customUseLazyQuery(schema, options) {
  // const {getEmptyCart: resetCart} = useCartId();
  const [trigger, data] = useLazyQuery(schema, options);

  const customTrigger = params => {
    try {
      trigger(params);
    } catch (error) {
      if (error.graphQLErrors[0]) {
        // handleError(error.graphQLErrors[0], resetCart);
      }
    }
  };

  useEffect(() => {
    if (data?.data && !data.loading) {
      if (Object.keys(data.data)[0] === 'customer') {
        if (data.data.customer === null) {
          handleError({message: "The current customer isn't authorized."});
        }
      }

      if (Object.keys(data.data)[0] === 'cart') {
        if (data.data.cart === null) {
          handleError({message: "The current customer isn't authorized."});
        }
      }
    }
  }, [data?.data]);

  return [customTrigger, data];
}

export function customUseMutation(schema) {
  // const {getEmptyCart: resetCart} = useCartId();
  const [mutation] = useMutation(schema);

  const runMutation = async variableData => {
    const {variables} = variableData;
    try {
      const res = await mutation({variables});
      return res;
    } catch (err) {
      console.log('[err] from custom use mutation', err);
      console.log('[err] schema', schema);
      console.log('[err] variables', variables);
      if (err.graphQLErrors[0]) {
        // handleError(error.graphQLErrors[0], resetCart);
      }
    }
  };

  return [runMutation];
}
