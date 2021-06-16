const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
  publicPath: '/zjmzxfzhl-doc/zjmzxfzhl-bpmn/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 8899
  },
  configureWebpack: config => {
    // 生产环境相关配置
    if (process.env.NODE_ENV === "production") {
      config.externals = {
        vue: "Vue",
        "element-ui": "ELEMENT",
      }
      config.plugins.push(new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      }));
    }
  }
}
