import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface userState {
  isAuthenticated:boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  otpSent:boolean;
  otpVerified: boolean;
}

const initialState: userState = {
 isAuthenticated: false,
 loading: false,
 error: null,
 success: false,
 otpSent: false,
 otpVerified: false,
};


export const loginUser = createAsyncThunk(
    'auth/login',
    async (
      { email, password }: { email: string; password: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post(
          'http://localhost:1000/admin/login',
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json',
              // You can add any other headers here if necessary
            },
            withCredentials: true, // This is equivalent to 'credentials: include' in fetch
          }
        );
  
        return response.data; // Assuming your API response structure includes user data and a token
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to login'
        );
      }
    }
  );


export const registerUser = createAsyncThunk(
    'auth/register',
    async (
      { firstname, lastname, email, password }: { firstname: string; lastname: string; email: string; password: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post(
          'http://localhost:1000/admin/register',
          { firstname, lastname, email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // This is equivalent to 'credentials: include' in fetch
          }
        );
  
        return response.data; // Assuming your API response structure includes user data and a token
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to register');
      }
    }
  );

  export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({  otp }: {  otp: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          'http://localhost:1000/admin/otpverify',
          {  otp },
          { withCredentials: true }
        );
  
        return response.data; // Assuming your API response structure includes success message
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to verify OTP'
        );
      }
    }
  );


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.otpSent = false;
      state.otpVerified = false;
    },

  },
  extraReducers: builder => {
    builder
    .addCase(loginUser.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error fetching employees';
    })

    .addCase(registerUser.pending, state => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error registering user';
      state.success = false;
    })
    
    .addCase(verifyOtp.pending, state => {
      state.loading = true;
      state.error = null;
      state.otpVerified = false;
    })
    .addCase(verifyOtp.fulfilled, (state) => {
      state.loading = false;
      state.otpVerified = true;
      state.error = null;
    })
    .addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error verifying OTP';
      state.otpVerified = false;
    })

    ;
     
  },
});


export const { logout } = userSlice.actions;
export default userSlice.reducer;
