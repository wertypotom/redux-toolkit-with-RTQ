import React, { useEffect, useState } from 'react';
import './App.css';
import PostContainer from './components/PostContainer';
import PostForm from './components/PostForm';
import TasksContainer from './components/TasksContainer';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { addPost, fetchUsers, getUsersData } from './store/reducers/UserSlice';

function App() {
  const { error, isLoading, users, tasks } = useAppSelector(getUsersData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <PostForm />
      <hr />
      <TasksContainer />
      <hr />
      <PostContainer />
    </div>
  );
}

export default App;
