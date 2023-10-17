import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(
      /* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
      'suggestion/fetch',
      async () => {
          try {
              const response = await fetch('http://localhost:3004/api/suggestion')
              /*if (!response.ok) {
                  throw new Error('Failed to fetch suggestion')
              }*/
              const responseJson = await response.json()
              return responseJson.data
          } catch (err) {
              throw err
          }
      }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
      builder.addCase(fetchSuggestion.pending, (state) => ({
          ...state,
          loading: true,
          error: null }))
      builder.addCase(fetchSuggestion.rejected, (state, action) => ({
          ...state,
          suggestion: '',
          loading: false,
          error: true
      }))
      builder.addCase(fetchSuggestion.fulfilled, (state, action) => ({
          ...state,
          suggestion: action.payload,
          loading: false,
          error: null
      }))
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file

export const selectSuggestion = (state) => state.suggestion.suggestion
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
