const storage = require('../../modules/storage')
const { authenticate } = require('ldap-authentication')

module.exports = async (req, res) => {
  if (config.LDAP.enabled) {
    console.log('Connecting to LDAP server')

    let options = ({
      ldapOpts: {
        url: 'ldap://auth.youthforclimate.fr'
      },
      userDn: 'uid=gauss,dc=example,dc=com',
      userPassword: 'password',
      userSearchBase: 'dc=example,dc=com',
      usernameAttribute: 'uid',
      username: 'gauss'
    })
  
    let user = await authenticate(options)
    res.json(user)
  } else {
    res.json({
      code: 'ERROR',
      message: 'LDAP is not enabled'
    })
  }
}