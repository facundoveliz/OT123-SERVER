const express = require('express')

const pingRouter = require('./ping')
const usersRouter = require('./users')
const categoriesRouter = require("./categories");

 
const router = new express.Router()

router.use('/ping', pingRouter)
router.use('/users', usersRouter)
router.use("/categories", categoriesRouter);

module.exports = router
