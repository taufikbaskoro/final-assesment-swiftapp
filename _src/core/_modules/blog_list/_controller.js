import React, {useEffect, useState} from 'react';
import {withProfiler} from '@sentry/react-native';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {GET_BLOG_BY_FILTER} from '@app/_modules/blog_list/services/schema';

import Views from '@app/_modules/blog_list/_view';
import {modules} from '@root/swift.config';

const BlogList = props => {
  if (!modules.blog_list.enable) {
    return null;
  }

  const {categoryId} = props.route.params;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [blogList, setBlogList] = useState([]);
  const [variables, setVariables] = useState({
    categoryId: categoryId,
    pageSize: 6,
    currentPage: 1,
  });

  const {data: blogListData, loading: blogListLoading} = customUseQuery(
    GET_BLOG_BY_FILTER,
    {
      variables,
    },
  );

  useEffect(() => {
    if (blogListData?.getBlogByFilter?.items) {
      if (!noMoreData) {
        const {items, total_count} = blogListData?.getBlogByFilter;

        const currentData = blogList;
        const newData = [...currentData, ...items];

        setTotalCount(total_count);
        setBlogList(newData);

        if (total_count === newData.length) {
          setNoMoreData(true);
        }
      }
    }
  }, [blogListData]);

  const onLoadMore = () => {
    if (!blogListLoading) {
      if (totalCount > blogList.length) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);

        const variablesTmp = {
          ...variables,
          currentPage: newPage,
        };
        setVariables(variablesTmp);
      } else {
        setNoMoreData(true);
      }
    }
  };

  const onRefresh = async () => {
    const variablesTmp = {
      ...variables,
      currentPage: 1,
    };
    await setRefreshing(true);
    await setBlogList([]);
    await setCurrentPage(1);
    await setNoMoreData(false);
    await setVariables(variablesTmp);
    await setRefreshing(false);
  };

  return (
    <Views
      {...props}
      blogList={blogList}
      blogListLoading={blogListLoading}
      noMoreData={noMoreData}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onLoadMore={onLoadMore}
    />
  );
};

export default withProfiler(BlogList, {name: 'BlogList'});
