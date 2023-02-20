
const router=require('express').Router()

const {addCat,getCat}=require('../controller/category')
router.get('/',getCat)
router.post('/',addCat)

module.exports=router