const buildResponse = (res, statusCode, message) => {
    res.statusCode = statusCode
    res.message = message
    return res.send()
}

export default buildResponse