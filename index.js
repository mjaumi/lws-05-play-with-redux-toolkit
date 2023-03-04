const store = require('./rtk/app/store');
const { fetchVideo } = require('./rtk/features/video/videoSlice');

// subscribing the store here
store.subscribe(() => {

});

// dispatching fetchVideo action to randomly get a video
store.dispatch(fetchVideo());