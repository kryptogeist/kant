'use strict'

const fileManager = require('./file-manager.js')
const reporter = require('./reporter.js')
const q = require('q')

module.exports.analyse = (source, options) => {
  const deferred = q.defer()

  // TODO: switch to streams instead of promises
  fileManager.parseFiles(source, options)
    .then((result) => {
      const report = reporter.analyze(result, (error, report) => {
        if (error) {
          deferred.reject(error)
        } else {
          deferred.resolve(report)
        }
      })
    })
    .catch((error) => {
      deferred.reject(error)
    })

  return deferred.promise
}
