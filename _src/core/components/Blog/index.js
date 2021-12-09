/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {
  Text,
  Button,
  ActivityIndicator,
  TouchableRipple,
  Colors as ColorsPaper,
} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {withProfiler} from '@sentry/react-native';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {Colors, MixinsNew} from '@app/styles';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';
import {useTranslation} from 'react-i18next';
import {
  GET_BLOG_BY_FILTER,
  GET_BLOG_CATEGORY,
} from '@app/_modules/blog_list/services/schema';

import Section from '@app/components/Section';
import BlogItem from '@app/_modules/blog_list/atoms/BlogItem';

import styles from '@app/components/Blog/styles';

const Blog = () => {
  const {t} = useTranslation();
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [variables, setVariables] = useState({
    categoryId: selectedCategory,
    pageSize: 3,
    currentPage: 1,
  });

  const {data: blogCategoryData, loading: blogCategoryLoading} =
    customUseQuery(GET_BLOG_CATEGORY);

  const {data: blogListData, loading: blogListLoading} = customUseQuery(
    GET_BLOG_BY_FILTER,
    {
      variables,
    },
  );

  useEffect(() => {
    if (blogCategoryData?.getBlogCategory?.data) {
      setBlogCategories(blogCategoryData.getBlogCategory.data);
    }
  }, [blogCategoryData]);

  useEffect(() => {
    if (blogListData?.getBlogByFilter?.items) {
      setBlogList(blogListData?.getBlogByFilter?.items);
    }
  }, [blogListData]);

  const BlogCategories = withProfiler(
    ({selectedCategory}) => {
      const selectCategory = category => {
        let categoryId = 0;
        if (selectedCategory !== category.id) {
          categoryId = category.id;
        }
        setVariables({
          ...variables,
          categoryId,
        });
        setSelectedCategory(categoryId);
      };

      if (!blogCategoryLoading) {
        if (blogCategories.length) {
          return (
            <ScrollView horizontal style={styles.categoryRowContainer}>
              {blogCategories.map((category, index) => {
                const isSelected = selectedCategory === category.id;
                const fontWeight = isSelected ? {fontWeight: 'bold'} : {};
                return (
                  <Button
                    key={'category-blog-' + index}
                    mode="contained"
                    onPress={() => selectCategory(category)}
                    style={[
                      styles.btnCategory,
                      {
                        backgroundColor: isSelected
                          ? Colors.PRIMARY
                          : ColorsPaper.grey300,
                      },
                    ]}>
                    <Text
                      style={{
                        ...fontWeight,
                        color: isSelected
                          ? ColorsPaper.white
                          : ColorsPaper.grey500,
                      }}>
                      {category.name}
                    </Text>
                  </Button>
                );
              })}
            </ScrollView>
          );
        } else {
          return (
            <Section>
              <Text>No Blog Category available</Text>
            </Section>
          );
        }
      } else {
        return (
          <Section>
            <ActivityIndicator />
          </Section>
        );
      }
    },
    {name: 'BlogCategories'},
  );

  const BlogList = withProfiler(
    () => {
      if (!blogListLoading) {
        if (blogList.length) {
          return blogList.map((blog, index) => {
            return <BlogItem key={'blog-' + index} blog={blog} />;
          });
        } else {
          return (
            <Section>
              <Text>No Blog available</Text>
            </Section>
          );
        }
      } else {
        return (
          <ActivityIndicator
            style={{...MixinsNew.margin({top: 40, bottom: 30})}}
          />
        );
      }
    },
    {name: 'BlogList'},
  );

  return (
    <>
      <Section maxWidth alignStart hpadding2 vpadding>
        <Text bold>{t('label.newsArticle')}</Text>
      </Section>
      <BlogCategories selectedCategory={selectedCategory} />
      <BlogList />
      <TouchableRipple
        style={{alignSelf: 'center', ...MixinsNew.padding(10)}}
        onPress={() =>
          navigateTo(modules.blog_list.enable, modules.blog_list.name, {
            categoryId: selectedCategory,
          })
        }>
        <Text>{t('label.viewMore')}</Text>
      </TouchableRipple>
    </>
  );
};

export default withProfiler(Blog, {name: 'Blog'});
