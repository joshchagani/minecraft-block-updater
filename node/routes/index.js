const express = require('express')
const router = express.Router()
const blockController = require('../controllers/blockController')

router.get('/all-blocks', blockController.getBlocks)

module.exports = router
