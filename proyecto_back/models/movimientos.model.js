const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovimientosSchema = new Schema({
    usuario:{type:String, required: true, max:100},
    nombre:{type: String, required: true, max:60},
    fecha:{type: String, required: true, max:40},
    monto:{type: String, required: true, max:40},
    categoria:{type: String, required: true, max:15},
    descripcion:{type: String, required: false, max:150}
});

module.exports = mongoose.model("movimientos", MovimientosSchema);