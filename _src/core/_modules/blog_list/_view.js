import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import NavBar from '@app/components/NavBar';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Text from '@app/components/Text';

import BlogItem from '@app/_modules/blog_list/atoms/BlogItem';

const BlogListScreen = ({
  blogListLoading,
  blogList,
  onLoadMore,
  noMoreData,
  refreshing,
  onRefresh,
}) => {
  const {t} = useTranslation();
  const FooterElement = withProfiler(
    () => {
      if (blogListLoading) {
        return <ActivityIndicator />;
      }

      return (
        <Section maxWidth centerChildren vpadding2>
          <RenderIf condition={noMoreData}>
            <Text>No More Data</Text>
          </RenderIf>
        </Section>
      );
    },
    {name: 'FooterElement'},
  );

  return (
    <SafeAreaView>
      <NavBar useBack title={t('label.newsArticle')} />
      <FlatList
        data={blogList}
        renderItem={({item}) => <BlogItem blog={item} />}
        keyExtractor={item => item.id}
        ListFooterComponent={FooterElement}
        ListFooterComponentStyle={{alignSelf: 'center'}}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default withProfiler(BlogListScreen, {name: 'BlogListScreen'});
