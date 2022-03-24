function Logger(type) {
  function createLogger(msg) {
    console.log(`[${type}] ${msg}`)
  }
  return createLogger
}

export const LogError = Logger('ERROR')
export const LogInfo = Logger('INFO')