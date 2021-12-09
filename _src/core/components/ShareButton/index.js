import Section from '@app/components/Section';
import {rxAppSnackbar} from '@app/services/cache';
import {normalize} from '@app/styles/mixins';

import React from 'react';
import Share from 'react-native-share';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const ButtonIcon = ({type}) => {
  switch (type) {
    case 'email':
      return <AntDesignIcon name={'mail'} size={normalize(20)} />;
    case 'instagram':
      return <AntDesignIcon name={'instagram'} size={normalize(20)} />;
    case 'whatsapp':
      return <FontAwesomeIcon name={'whatsapp'} size={normalize(20)} />;
    default:
      return <AntDesignIcon name={'sharealt'} size={normalize(20)} />;
  }
};

const ShareButton = ({message = '', title, url, type = null}) => {
  const shareProduct = async () => {
    let shareOptions = {
      title: `Share ${title}`,
      message: `${message}${title} \n`,
      url,
    };

    if (type) {
      switch (type) {
        case 'email':
          shareOptions = {...shareOptions, social: Share.Social.EMAIL};
          break;
        case 'instagram':
          shareOptions = {...shareOptions, social: Share.Social.INSTAGRAM};
          break;
        case 'whatsapp':
          shareOptions = {...shareOptions, social: Share.Social.WHATSAPP};
          break;
        default:
          break;
      }
    }

    try {
      type
        ? await Share.shareSingle(shareOptions)
        : await Share.open(shareOptions);
    } catch (error) {
      rxAppSnackbar({
        message: 'Failed to share, please try again later.',
      });
    }
  };

  return (
    <Section
      radius
      padding={normalize(5)}
      hmargin={normalize(5)}
      onPress={shareProduct}>
      <ButtonIcon type={type} />
    </Section>
  );
};

export default ShareButton;
