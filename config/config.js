const localConfig = require('./config.local')

const defaultConfig = {
  picturesDir: '.'
}

module.exports = Object.assign({}, defaultConfig, localConfig)
