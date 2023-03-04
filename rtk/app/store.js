const { configureStore } = require('@reduxjs/toolkit');
const videoSlice = require('../features/video/videoSlice');
const { createLogger } = require('redux-logger');

// creating the logger instance here
const logger = createLogger();

// configuring the redux store here
const store = configureStore({
    reducer: {
        video: videoSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;