module.exports = {
    'devServer': {
      'host': 'localhost'
    },
    'configureWebpack': {
      'optimization': {
        'splitChunks': {
          'minSize': 10000,
          'maxSize': 250000
        }
      }
    },
    'pwa': {
      'name': 'Etl Chile',
      'display': 'standalone',
      'themeColor': '#3d4f5d',
      'msTileColor': '#3d4f5d',
      'gcm_sender_id': '975701806637',
      'appleMobileWebAppCapable': 'yes',
      'appleMobileWebAppStatusBarStyle': 'black',
      'workboxPluginMode': 'InjectManifest',
      'workboxOptions': {
        'swSrc': 'src/service-worker.js',
        'exclude': [
          /\.map$/,
          /manifest\.json$/
        ]
      }
    },
    'transpileDependencies': [
      'vuetify'
    ]
  }
  