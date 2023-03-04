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
    const tagsText = tags.map(tag => `tags_like=${tag}`).join('&');
    const response = await fetch(`http://localhost:9000/videos?${tagsText}`);
    const videos = await response.json();

    // sorting the videos based on views here
    const sortedVideos = videos.sort((vid1, vid2) => {
        const views1 = parseFloat(vid1.views.slice(0, -1));
        const views2 = parseFloat(vid2.views.slice(0, -1));

        if (views1 < views2) {
            return 1;
        } else if (views1 > views2) {
            return -1;
        }
        return 0;
    });

    return sortedVideos;
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