import NodeCache from 'node-cache'
import buildResponse from './requestBuilder.js'
import messages from './messages.js'
import codes from './http.js'

export const instance = new NodeCache({ stdTTL: 0 })

export const verifyRequestRegistration = (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) 
        return buildResponse(res, codes.badRequest, messages.emptyUserOrPassword)

    if (instance.has(username)) 
        return buildResponse(res, codes.conflict, messages.userAlreadyInUse)

    return next()
  } catch (err) {
    throw new Error(err)
  }
}

export const verifyRequestAuthentication = (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) 
        return buildResponse(res, codes.badRequest, messages.emptyUserOrPassword)

    if (!instance.has(username)) 
        return buildResponse(res, codes.unauthorized, messages.userNotRegistered)

    return next()
  } catch (err) {
    throw new Error(err)
  }
}