import React, {useEffect, useState} from 'react';
import {withProfiler} from '@sentry/react-native';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {GET_BLOG_BY_ID} from '@app/_modules/blog_detail/services/schema';

import Views from '@app/_modules/blog_detail/_view';
import {modules} from '@root/swift.config';

const BlogDetail = props => {
  if (!modules.blog_detail.enable) {
    return null;
  }

  const {blogId} = props.route.params;

  const [blogDetail, setBlogDetail] = useState(null);

  const {data: blogData, loading: blogLoading} = customUseQuery(
    GET_BLOG_BY_ID,
    {
      variables: {blogId},
    },
  );

  useEffect(() => {
    if (blogData?.getBlogByFilter?.items[0]) {
      setBlogDetail(blogData?.getBlogByFilter?.items[0]);
    }
  }, [blogData]);

  return <Views {...props} blogDetail={blogDetail} blogLoading={blogLoading} />;
};

export default withProfiler(BlogDetail, {name: 'BlogDetail'});
