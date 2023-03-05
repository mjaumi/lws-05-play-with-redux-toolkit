const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState = {
    loading: false,
    videos: [],
    error: '',
};

// fetching random videos by tags here with async thunk
const fetchRelatedVideos = createAsyncThunk('relatedVideos/fetchRelatedVideos', async (tags) => {
    const queryString = tags.map(tag => `tags_like=${tag}`).join('&') + '&_sort=views&_order=desc';
    const response = await fetch(`http://localhost:9000/videos?${queryString}`);
    const videos = await response.json();

    return videos;
});

// creating videos by tags slice here
const relateVideosSlice = createSlice({
    name: 'relatedVideos',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchRelatedVideos.pending, (state, action) => {
            state.loading = true;
            state.videos = [];
            state.error = '';
        });

        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
            state.error = '';
        });

        builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
            state.loading = false;
            state.videos = [];
            state.error = action.error;
        });
    },
});

module.exports = relateVideosSlice.reducer;
module.exports.fetchRelatedVideos = fetchRelatedVideos;