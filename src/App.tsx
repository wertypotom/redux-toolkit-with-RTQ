import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { addPost, fetchUsers, getUsersData } from './store/reducers/UserSlice';

function App() {
  const { error, isLoading, users, tasks } = useAppSelector(getUsersData);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const generatePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (title && description) {
      dispatch(addPost(title, description));
      setTitle('');
      setDescription('');
    }

    return;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: '1px solid black',
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
      {JSON.stringify(users, null, 2)}
    </div>
  );
}

export default App;
