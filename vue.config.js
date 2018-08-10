module.exports = {
  // Can add stuff to webpack using the below,
  // This will get merged with the vue-cli's Webpack config
  //
  // configureWebpack: {
  //   module: {
  //     rules: []
  //   }
  // },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
};

