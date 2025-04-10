const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { merge } = require('webpack-merge');
const common = require('../../webpack.common.js');
const devConfig = require('../../webpack.dev.js');
const config = merge(common, devConfig);

const compiler = webpack(config);
const server = new WebpackDevServer(devConfig.devServer, compiler)

server.startCallback((err) => {
    if (err) {
        console.error('Failed to start the dev server:', err);
        return;
    }
    console.log('Dev server started on http://localhost:9000');

    if (process.send) {
        process.send('ok');
    }
});