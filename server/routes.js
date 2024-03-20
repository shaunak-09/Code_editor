const express = require('express');
const router = express.Router();
const {submit,snippets}=require('./controllers/data')
// const execute=require('./controllers/execute')

router.post('/submit',submit)
router.get('/snippets',snippets)
// router.post('/execute',execute)

module.exports=router