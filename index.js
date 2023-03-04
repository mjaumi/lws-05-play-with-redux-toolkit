const store = require('./rtk/app/store');
const { fetchVideo } = require('./rtk/features/video/videoSlice');
const { fetchVideos } = require('./rtk/features/videosByTags/videosByTagsSlice');

let isFetchVideoCalled = false;

// subscribing the store here
store.subscribe(() => {
    const tags = store.getState().video.video?.tags;

    if (tags && !isFetchVideoCalled) {
        const tagsArray = tags.map(tag => `tags_like=${tag}`);
        const tagsText = tagsArray.join('&');
        isFetchVideoCalled = true;
        store.dispatch(fetchVideos(tagsText));
    }
});

// dispatching fetchVideo action to randomly get a video
store.dispatch(fetchVideo());