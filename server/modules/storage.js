/**
 * The basis of this module are the group and ID element
 * For exmple, the file (named with the ID) of an user will be in the directory "user" (the group)
 */

const fs = require('fs')
const path = require('path').resolve('../storage')

const utils = {
  parse (content) {
    try {
      return JSON.parse(content)
    } catch {
      return 'ERROR'
    }
  },

  code (content) {
    try {
      return JSON.stringify(content)
    } catch {
      return 'ERROR'
    }
  }
}

const storage = {
  create (group, id, content) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(`${path}/${group}`)) {
        fs.mkdirSync(`${path}/${group}`, { recursive: true })
      }

      fs.writeFile(`${path}/${group}/${id}.json`, utils.code(content), err => {
        if (err) reject(err)
        resolve()
      })
    })
  },

  delete (group, id, key) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(`${path}/${group}`)) {
        if (!key) {
          fs.unlink(`${path}/${group}/${id}.json`, err => {
            if (err) reject(err)
            resolve()
          })
        } else {
          fs.readFile(`${path}/${group}/${id}.json`, (err, data) => {
            if (err) reject(err)
            data = utils.parse(data)
            delete data[key]
            fs.writeFile(`${path}/${group}/${id}.json`, utils.code(data), err => {
              if (err) reject(err)
              resolve()
            })
          })
        }
      }
    })
  },

  update (group, id, key, value) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${path}/${group}/${id}.json`, (err, data) => {
        if (err) reject(err)
        data = utils.parse(data)
        data[key] = value
        fs.writeFile(`${path}/${group}/${id}.json`, utils.code(data), err => {
          if (err) reject(err)
          resolve()
        })
      })
    })
  },

  get (group, id, key) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${path}/${group}/${id}.json`, (err, data) => {
        if (err) reject(err)
        if (!key) {
          resolve(utils.parse(data))
        } else {
          resolve(utils.parse(data)[key])
        }
      })
    })
  }
}

module.exports = storage