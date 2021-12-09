import * as Sentry from '@sentry/react-native';
import {useRef, useEffect} from 'react';
import {useReactiveVar} from '@apollo/client';
import {rxUserInformation} from '@app/services/cache';

export const useSentryPerf = name => {
  const account = useReactiveVar(rxUserInformation);
  const transaction = useRef();
  const span = useRef();

  useEffect(() => {
    Sentry.setUser({email: account?.email ? account.email : 'no-email'});
    Sentry.setUser({
      username: account?.firstname ? account.firstname : 'no-name',
    });
  }, []);

  const startTransaction = async op => {
    transaction.current = await Sentry.startTransaction({
      name,
      sampled: true,
    });

    span.current = transaction.current.startChild({
      op,
    });
  };

  const finishTransaction = () => {
    transaction.current.finish();
    span.current.finish();
  };

  return {startTransaction, finishTransaction};
};
