const controller = require('../controller')

const router = require('express').Router()

router.post('/auth/register', (req, res) => controller.auth.register(req, res))
router.post('/auth/login', (req, res) => controller.auth.login(req, res))

module.exports = router