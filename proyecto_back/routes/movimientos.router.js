const express = require("express");
const router = express.Router();
const MovimientosController = require("../controllers/movimientos.controller");

router.post('/', MovimientosController.create);
router.get('/', MovimientosController.find);
router.get('/:id', MovimientosController.findOne);
router.put('/:id', MovimientosController.update);
router.delete('/:id', MovimientosController.remove);

module.exports = router;