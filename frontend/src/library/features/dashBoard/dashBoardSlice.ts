import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { theaterDetails } from '@/library/types';
import axios from 'axios';
import { Console } from 'console';

axios.defaults.withCredentials = true;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


interface Theater {
  _id: string;
  theaterName: string;
  address: string;
  ownerID: string;
  screenIDs: string[];
  __v: number;
}

interface GetTheatersResponse {
  theaterDetails: Theater[];
}

interface TheaterState {
  theaters: Theater[];
  loading: boolean;
  error?: string;
}

const initialState: TheaterState = {
  theaters: [],
  loading: false,
};




// function to get all theater when the dashboard page initially loads

export const getTheaters = createAsyncThunk<GetTheatersResponse>(
  'dashBoard/getTheaters',
  async () => {
    try {
      const response = await axios.get<GetTheatersResponse>('http://localhost:1000/dashBoard/getTheaters');
      return response.data;
      
      console.log('Fetched theaters:', response.data); // Log response data
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }
);


// function to add new theater

export const addTheater = createAsyncThunk(
  'dashBoard/addTheater',
  async ({ theaterName, address }: { theaterName: string; address: string }) => {
    try {
      const response = await axios.post(
        'http://localhost:1000/dashBoard/addTheater',
        {
          theaterName,
          address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.theaterDetails; // Assuming the server responds with data you want to return
    } catch (error) {
      console.error('Error occurred:', error);
      throw error; // Rethrow error to be handled by the thunk's `rejected` action
    }
  }
);


// function to add Screen

export const addScreen = createAsyncThunk(
  'dashBoard/addScreen',
  async ({ theaterName, address }: { theaterName: string; address: string }) => {
    try {
      const response = await axios.post(
        'http://localhost:1000/dashBoard/addScreen',
        {
          theaterName,
          address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.theaterDetails; 
    } catch (error) {
      console.error('Error occurred:', error);
      throw error; // Rethrow error to be handled by the thunk's `rejected` action
    }
  }
);



const theaterSlice = createSlice({
  name: 'theater',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTheaters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTheaters.fulfilled, (state, action: PayloadAction<GetTheatersResponse>) => {
        state.theaters = action.payload.theaterDetails;
        state.loading = false;
      })
      .addCase(getTheaters.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch theaters';
        state.loading = false;
      })
      .addCase(addTheater.fulfilled, (state,action: PayloadAction<Theater>) =>{

        state.theaters.unshift(action.payload);

      })

      
      ;
  },
});

export default theaterSlice.reducer;
