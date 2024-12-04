import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Define the types for screen and the API response structure
interface Screen {
  _id: string;
  screenName: string;
  seatMatrix: (string | null)[][]; // 2D array where each value can be either a string or null
  sections: any[]; // Replace `any` with the correct type if known
}

interface ScreenResponse {
  // Replace `screenDetails` with the exact key name used in the server response
  screenDetails: Screen[]; 
}

interface ScreensState {
  screens: Screen[];
  loading: boolean;
  error?: string;
}

// Initial state for screens slice
const initialState: ScreensState = {
  screens: [],
  loading: false,
};

// Async thunk for fetching screens based on theaterId
export const getScreens = createAsyncThunk(
  'dashBoard/getScreens',
  async ({ theaterId }: { theaterId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:1000/dashBoard/getScreens`, // Use BASE_URL here
        { theaterId },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data) // Ensure response data matches ScreenResponse type
      return response.data;
      
    } catch (error: any) {
      console.error('Error occurred:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch screens');
    }
  }
);


// Async thunk for adding a new screen
export const addScreen = createAsyncThunk(
  'dashBoard/addScreen',
  async (packedData: { id: string; screenName: string; sections: any[]; seatMatrix: (string | null)[][] }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/dashBoard/addScreen`, packedData);
      return response.data; // Assuming the response contains the newly added screen or updated list
    } catch (error: any) {
      console.error('Failed to add screen:', error);
      return rejectWithValue(error.response?.data || 'Failed to add screen');
    }
  }
);

// Create screens slice with reducers and async thunk
const screenSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScreens.pending, (state) => {
        state.loading = true;
      })
      .addCase(getScreens.fulfilled, (state, action: PayloadAction<ScreenResponse>) => {
        // Assuming the correct key is `screenDetails` or replace it with the correct one
        state.screens = action.payload.screenDetails;
        state.loading = false;
      })
      .addCase(getScreens.rejected, (state, action) => {
        state.error = action.payload as string || 'Failed to fetch screens';
        state.loading = false;
      })
      .addCase(addScreen.pending, (state) => {
        state.loading = true; // Set loading to true when adding a screen
      })
      .addCase(addScreen.fulfilled, (state, action: PayloadAction<Screen>) => {
        state.screens.push(action.payload); // Add the newly added screen to the list
        state.loading = false; // Set loading to false after adding
      })
      .addCase(addScreen.rejected, (state, action) => {
        state.error = action.payload as string || 'Failed to add screen';
        state.loading = false; // Set loading to false if there's an error
      });
  }
});

export default screenSlice.reducer;
