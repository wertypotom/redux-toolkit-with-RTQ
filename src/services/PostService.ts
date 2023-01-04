import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../models/IPost';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['post'],
  endpoints: (builder) => {
    return {
      fetchAllPosts: builder.query<IPost[], number>({
        query: (limit: number = 5) => ({
          url: '/posts',
          params: {
            _limit: limit,
          },
        }),
        providesTags: () => ['post'],
      }),

      createPost: builder.mutation<IPost, IPost>({
        query: (post: IPost) => ({
          url: '/posts',
          method: 'POST',
          body: post,
        }),
        invalidatesTags: ['post'],
      }),

      updatePost: builder.mutation<IPost, IPost>({
        query: (post: IPost) => ({
          url: `/posts/${post.id}`,
          method: 'PUT',
          body: post,
        }),
        invalidatesTags: ['post'],
      }),

      deletePost: builder.mutation<IPost, IPost>({
        query: (post: IPost) => ({
          url: `/posts/${post.id}`,
          method: 'DELETE',
          body: post,
        }),
        invalidatesTags: ['post'],
      }),
    };
  },
});

export const {
  useFetchAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
