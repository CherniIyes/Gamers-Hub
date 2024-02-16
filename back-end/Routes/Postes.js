const router = require('express').Router()

const controller = require('../Controllers/Postes.js')

router.get('/getAll', controller.getAll)
router.get('/getOne/:id', controller.getOne)
router.post('/add', controller.add)
router.delete('/delete/:id', controller.Delete)
router.put('/update/:id', controller.update)
router.get('/search', controller.searchByTitle);
module.exports = router