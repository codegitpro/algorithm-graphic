const express = require('express')
const path = require('path')
const api = require('./api')
const log = require('./logger')

// new express app
const app = express()

// set express port
if (process.env.NODE_ENV === 'test') {
    app.set('port', 4001)
} else {
    app.set('port', process.env.PORT || 4000)
}

// configure views
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, '../app'))

// define API routes
app.use(api)

// define static routes
app.use(express.static(path.join(__dirname, '../app/public')))
app.use(express.static(path.join(__dirname, '../app/build')))
// initialize server
const server = app.listen(app.get('port'), () => {
    log.info(
        `Express server started on http://localhost:${server.address().port}`
    )
})

// export server app
module.exports = server
