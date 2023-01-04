import React from 'react';
import { postApi } from '../services/PostService';

const PostContainer = () => {
  const { data: posts } = postApi.useFetchAllPostsQuery(5);

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button>Remove post</button>
        </div>
      ))}
    </div>
  );
};

export default PostContainer;
