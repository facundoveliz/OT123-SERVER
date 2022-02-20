const express = require('express')

const {
  getAllSlider, addSlider, updateSlider, deleteSlider, getSlider,
} = require('../controllers/sliders')
const validate = require('../schemas/sliderSchema')

const router = express.Router()
/* GET activities page. */
router.get('/', getAllSlider)

router.get('/:id', getSlider)

router.post('/', validate, addSlider)

router.put('/:id', validate, updateSlider)

router.delete('/:id', deleteSlider)

module.exports = router
