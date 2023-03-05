require('util').inspect.defaultOptions.depth = null;
const store = require('./rtk/app/store');
const { fetchVideo } = require('./rtk/features/video/videoSlice');
const { fetchRelatedVideos } = require('./rtk/features/relatedVideos/relatedVideosSlice');

let isFetchVideoCalled = false;

// subscribing the store here
store.subscribe(() => {
    const tags = store.getState().video.video?.tags;

    if (tags && !isFetchVideoCalled) {
        isFetchVideoCalled = true;
        // fetching related videos once when the tags are found
        store.dispatch(fetchRelatedVideos(tags));
    }
});

// dispatching fetchVideo action to randomly get a video
store.dispatch(fetchVideo());