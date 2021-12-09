/* eslint-disable no-shadow */
import React from 'react';
import {ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {Mixins} from '@app/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {
  formatDateNotif as formatDateBlog,
  trimHTMLTags,
} from '@app/helpers/General';

import NavBar from '@app/components/NavBar';
import Section from '@app/components/Section';
import SocialShareBlock from '@app/components/SocialShareBlock';
import Text from '@app/components/Text';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';

import styles from '@app/_modules/blog_detail/styles';

const BlogDetailScreen = ({blogDetail, blogLoading}) => {
  const {t} = useTranslation();
  const BlogDetail = withProfiler(
    ({blogDetail, blogLoading}) => {
      if (!blogDetail) {
        if (blogLoading) {
          return (
            <Section flex centerChildren>
              <ActivityIndicator />
            </Section>
          );
        } else {
          return (
            <Section flex centerChildren>
              <Text>No Detail</Text>
            </Section>
          );
        }
      } else {
        return (
          <ScrollView>
            <FastImage
              key={blogDetail.id}
              style={styles.blogImageContainer}
              source={{
                uri: blogDetail.featured_image_url,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <Section vmargin alignStart>
              <Section width={Mixins.MAX_WIDTH} row spaceBetween>
                <Section alignStart hmargin2>
                  <Text bold large>
                    {blogDetail.title}
                  </Text>
                  <Text small>{formatDateBlog(blogDetail.created_at)}</Text>
                </Section>

                <SocialShareBlock
                  url={`${Config.PWA_BASE_URL}/blog/${blogDetail.url_key}`}
                  title={blogDetail.title}
                  message={'Kindly check our article : '}
                />
              </Section>

              <Section vmargin hmargin2>
                <Text small>{trimHTMLTags(blogDetail.content)}</Text>
              </Section>
            </Section>
          </ScrollView>
        );
      }
    },
    {name: 'BlogDetail'},
  );

  return (
    <SafeAreaView>
      <NavBar useBack title={t('label.newsArticle')} />
      <BlogDetail blogDetail={blogDetail} blogLoading={blogLoading} />
    </SafeAreaView>
  );
};

export default withProfiler(BlogDetailScreen, {name: 'BlogDetailScreen'});
