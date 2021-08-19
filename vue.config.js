const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // port: '10000',
    overlay: {
      warnings: true,
      errors: true
    },
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/rs-mgr': {
        target: 'http://172.28.246.86:8899/rs-mgr', // 目标代理接口地址
        // target: 'http://192.168.13.131:8899/rs-mgr', // 目标代理接口地址
        secure: false,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/rs-mgr': '/'
        }
      }
    }
  },
  outputDir: 'dist',
  // outputDir: 'D://phpStudy//PHPTutorial//WWW',
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: true,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
          ) {
            return '@import "~@/styles/variables.scss";' + content
          }
          return content
        }
      }
    }
  },
  chainWebpack: config => {
    // 发布模式选择 main-prod.js
    config.when(process.env.NODE_ENV === 'production', config => {
      // 追加isProd 判断cdn模式
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
      // 修复HMR
      // config.resolve.symlinks(true)
    })

    // 开发模式 main-dev.js
    config.when(process.env.NODE_ENV === 'development', config => {
      // 追加isProd 判断开发模式不加载cdn
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })

    // 添加别名
    config.resolve.alias.set('@', resolve('./src'))
    // 修复HMR
    // config.resolve.symlinks(true)

    // 去除momentjs的其他语言
    // config
    //   .plugin('ignore')
    //   .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })
    // 配置svg
    // 清除svg默认配置对./src/icons文件夹的处理
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons')) // icons存放地（svg放的地方）
      .end()
    // 添加新的rule处理./src/icons文件夹的svg文件
    config.module
      .rule('icons')
      // .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
        include: ['src/assets/icons']
      })
      .end()
  }
}
