import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { addPost } from '../store/reducers/UserSlice';

const PostForm = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const dispatch = useAppDispatch();

  const generatePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (title && description) {
      dispatch(addPost(title, description));
      setTitle('');
      setDescription('');
    }

    return;
  };
  return (
    <div>
      <form onSubmit={generatePost}>
        <input
          type='text'
          placeholder='input title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='input description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type='submit'>Add post</button>
      </form>
    </div>
  );
};

export default PostForm;
