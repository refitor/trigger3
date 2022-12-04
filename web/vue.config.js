module.exports = {
    outputDir: '../trigger3',
    assetsDir: '../trigger3/assets',
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8000,
        https: false,
        open: false,
        hot: true,
        // proxy: {
        //     "/api": {
        //         target: 'http://localhost:8888',
        //         changeOrigin: false,
        //         secure: false,
        //     }
        // }
    },
    productionSourceMap: false,
}