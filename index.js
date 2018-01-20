const express = require('express')
const app = express()
const fs = require('fs')
const config = require('./config/config')

app.use('/static', express.static(config.picturesDir))
app.get('/', (req, res) => {
  res.json(
    fs.readdirSync(config.picturesDir)
  )
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = app