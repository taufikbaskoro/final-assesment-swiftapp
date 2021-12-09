import React from 'react';
import {Snackbar} from 'react-native-paper';
import {rxAppSnackbar} from '@app/services/cache';
import {useReactiveVar} from '@apollo/client';
import {normalize} from '@app/styles/mixins';

const SnackBar = () => {
  const snackbar = useReactiveVar(rxAppSnackbar);

  if (!snackbar) {
    return null;
  }
  return (
    <Snackbar
      style={{marginBottom: normalize(60)}}
      visible={snackbar}
      onDismiss={() => rxAppSnackbar(null)}
      duration={snackbar.duration ? snackbar.duration : 2000}>
      {snackbar.message}
    </Snackbar>
  );
};

export default SnackBar;
