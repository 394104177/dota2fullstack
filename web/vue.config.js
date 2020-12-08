module.exports = {
    outputDir: __dirname +'/../server/web',
    publicPath: process.env.NODE_ENV === 'production'
      ? '/'
      : '/',
      configureWebpack: {
        devServer: {
            open:true
          }
      }
  }