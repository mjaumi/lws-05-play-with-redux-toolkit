const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState = {
    loading: false,
    videos: [],
    error: '',
};

// fetching random videos by tags here with async thunk
const fetchVideos = createAsyncThunk('videos/fetchVideos', async (tagsUrl) => {
    const response = await fetch(`http://localhost:9000/videos?${tagsUrl}`);
    const videos = await response.json();
    return videos;
});

// creating videos by tags slice here
const videosByTagsSlice = createSlice({
    name: 'videosByTags',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchVideos.pending, (state, action) => {
            state.loading = true;
            state.videos = [];
            state.error = '';
        });

        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
            state.error = '';
        });

        builder.addCase(fetchVideos.rejected, (state, action) => {
            state.loading = false;
            state.videos = [];
            state.error = action.error;
        });
    },
});

module.exports = videosByTagsSlice.reducer;
module.exports.fetchVideos = fetchVideos;