class AppError extends Error {
  constructor (statusCode, message, err) {
    super(message)

    this.statusCode = statusCode
    this.message = message
    this.err = err
  }
}

module.exports = AppError
