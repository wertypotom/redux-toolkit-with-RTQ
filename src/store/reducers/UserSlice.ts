import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { ITask } from '../../models/ITask';
import { IUser } from '../../models/IUser';

interface UserState {
  users: IUser[];
  tasks: ITask[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  tasks: [],
  isLoading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Could not load data');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<ITask>) => {
        console.log('action.payload ', action.payload);
        state.tasks.push(action.payload);
      },
      prepare: (title: string, description: string) => {
        console.log('title');
        return {
          payload: {
            id: nanoid(),
            title,
            description,
          },
        };
      },
    },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const getUsersData = (state: RootState) => state.UserReducer;

export const { addPost } = userSlice.actions;
export default userSlice.reducer;
