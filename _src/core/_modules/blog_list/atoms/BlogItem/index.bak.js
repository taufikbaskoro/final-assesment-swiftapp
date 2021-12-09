import Section from '@app/components/Section';
import Text from '@app/components/Text';
import {
  formatDateNotif as formatDateBlog,
  shortenText,
  trimHTMLTags,
} from '@app/helpers/General';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {withProfiler} from '@sentry/react-native';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

const BlogItem = ({blog}) => {
  return (
    <Section
      onPress={() =>
        navigateTo(modules.blog_detail.enable, modules.blog_detail.name, {
          blogId: blog.id,
        })
      }
      centerChildren
      alignStart
      width={Mixins.MAX_WIDTH * 0.9}
      row
      border={Colors.GRAY_MEDIUM}
      radius
      padding
      margin>
      <FastImage
        key={blog.id}
        style={{
          width: normalize(80),
          height: normalize(80),
          marginRight: normalize(10),
          borderRadius: normalize(25),
        }}
        source={{
          uri: blog.featured_image_url,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Section flex alignStart>
        <Text color={Colors.GRAY_MEDIUM} small>
          {formatDateBlog(blog.created_at)}
        </Text>
        <Text bold>{blog.title}</Text>
        <Text small>{shortenText(trimHTMLTags(blog.short_content), 100)}</Text>
      </Section>
    </Section>
  );
};

export default withProfiler(BlogItem, {name: 'BlogItem'});
