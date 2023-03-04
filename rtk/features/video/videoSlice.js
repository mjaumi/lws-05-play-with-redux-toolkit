const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState = {
    loading: false,
    video: {},
    error: '',
};

// fetching random video here with async thunk
const fetchVideo = createAsyncThunk('video/fetchVideo', async () => {
    const response = await fetch('http://localhost:9000/videos');
    const video = await response.json();
    return video;
});

// creating video slice to call random video here
const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideo.pending, (state, action) => {
            state.loading = true;
            state.video = {};
            state.error = '';
        });

        builder.addCase(fetchVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
            state.error = '';
        });

        builder.addCase(fetchVideo.rejected, (state, action) => {
            state.loading = false;
            state.video = {};
            state.error = action.error;
        });
    },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;