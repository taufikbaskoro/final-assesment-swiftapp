import React, {useState} from 'react';
import {normalize} from '@app/styles/mixins';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import ShareButton from '@app/components/ShareButton';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {socialShares} from '@root/swift.config';

const SocialShareBlock = ({url, title, message}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Section row spaceBetween alignCenter hmargin>
      <Section
        radius
        border
        padding={normalize(5)}
        hmargin
        onPress={() => setShowMore(!showMore)}>
        <AntDesignIcon
          name={showMore ? 'right' : 'sharealt'}
          size={normalize(20)}
        />
      </Section>
      <RenderIf condition={showMore}>
        <ShareButton url={url} title={title} message={message} />
        {socialShares.map(social => {
          return (
            <ShareButton
              url={url}
              title={title}
              type={social}
              message={message}
            />
          );
        })}
      </RenderIf>
    </Section>
  );
};

export default SocialShareBlock;
