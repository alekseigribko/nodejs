// import auth from './auth'
import bodyParser from 'body-parser'
import express from 'express'
import APIRouter from './api'
import db from './db'
import Logger from './utils/Logger'


const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('port', process.env.PORT)
app.set('env', process.env.NODE_ENV)

app.use('/api', APIRouter)

export function init() {
  return new Promise((resolve, reject) => {
    db.connect()
      .then(() => {
        const server = app.listen(app.get('port') | 3000, () => {
          Logger.info(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`)
          Logger.info('  Press CTRL-C to stop\n')
          app.set('started', true)
          resolve()
        })
        app.set('server', server)
      })
      .catch((err) => {
        Logger.error(err)
        reject(err)
      })
  })
}

export function close() {
  if (app.get('server')) {
    app.set('started', false)
    app.get('server').close()
  }
}

// app.use('/auth', auth.router)
export default app
