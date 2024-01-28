import express from 'express'
import bodyParser from 'body-parser'
import messages from './messages.js'
import codes from './http.js'
import { 
  instance as cache,
  verifyRequestAuthentication,
  verifyRequestRegistration
} from './cache.service.js'
import buildResponse from './requestBuilder.js'

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
const port = 3000

app.post('/user', verifyRequestRegistration, (req, res) => {
  try {
    cache.set(req.body.username, req.body.password)
    
    return buildResponse(res, codes.success, messages.userCreated)
  } catch (err) {
    throw new Error(err)
  }
})

app.post('/auth', verifyRequestAuthentication, (req, res) => {
  try {
    const { username, password } = req.body
    const storedPassword = cache.get(username)

    if (storedPassword !== password) 
      return buildResponse(res, codes.unauthorized, messages.passwordIncorrect)

    return buildResponse(res, codes.success, messages.loggedIn)
  } catch(err) {
    throw new Error(err)
  }
})

app.listen(port, () => {
  console.log(`Challenge app running on localhost port ${port}`)
})