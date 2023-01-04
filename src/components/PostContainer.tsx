import React from 'react';
import { IPost } from '../models/IPost';
import {
  postApi,
  useCreatePostMutation,
  useDeletePostMutation,
  useFetchAllPostsQuery,
  useUpdatePostMutation,
} from '../services/PostService';

const PostContainer = () => {
  const { data: posts, isLoading, isError } = useFetchAllPostsQuery(100);
  const [createPost, {}] = useCreatePostMutation();
  const [remove, {}] = useDeletePostMutation();
  const [update, {}] = useUpdatePostMutation();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Erorr happened...</h1>;
  }

  const createPostHandle = async () => {
    await createPost({ id: Date.now(), title: 'mememe', body: 'hoooray' });
  };

  const removePost = (e: React.MouseEvent<HTMLButtonElement>, post: IPost) => {
    e.stopPropagation();
    remove(post);
  };

  const updatePost = (e: React.MouseEvent<HTMLDivElement>, post: IPost) => {
    e.stopPropagation();
    update({ ...post, title: prompt() || '' });
  };

  return (
    <div>
      <button onClick={createPostHandle}>Create Post</button>
      <hr />

      {posts?.map((post) => (
        <div key={post.id} onClick={(e) => updatePost(e, post)}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={(e) => removePost(e, post)}>Remove post</button>
        </div>
      ))}
    </div>
  );
};

export default PostContainer;
