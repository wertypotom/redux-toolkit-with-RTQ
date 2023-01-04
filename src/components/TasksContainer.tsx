import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { fetchUsers, getUsersData } from '../store/reducers/UserSlice';

const TasksContainer = () => {
  const { error, isLoading, users, tasks } = useAppSelector(getUsersData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
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
};

export default TasksContainer;
