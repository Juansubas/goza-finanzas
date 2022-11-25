const Movimiento = require("../models/movimientos.model");
let response ={
    msg: "",
    exito: false
};

exports.create = function(req,res){
    let movimiento = new Movimiento({
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        monto: req.body.monto,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion
    });

    movimiento.save(function(err){
        if(err){
            console.log = false,
            response.exito = false,
            response.msg ="Error al guardar el movimiento"
            res.json(response)
            return;
        }
        
        response.exito = true;
        response.msg = "El movimiento se guardó correctamente"
        res.json(response)
    })
};

exports.find = function(req,res){
    Movimiento.find({usuario: req.headers.usuario}, function(err, movimientos){
        res.json(movimientos);
    })
}

//_id: es el de mongoDB, req.params es el de la solicitud y los parametros que atrapo, seleccionamos el id.

exports.findOne = function(req,res){
    Movimiento.findOne({_id: req.params.id}, function(err, movimiento){
        res.json(movimiento);
    })
}

exports.update = function(req,res){
    let movimiento = {
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        monto: req.body.monto,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion
    }

    Movimiento.findByIdAndUpdate(req.params.id, {$set: movimiento}, function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg = "Error al modificar el movimiento"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El movimiento se modificó correctamente"
        res.json(response)
    })
}

exports.remove = function(req,res) {
    Movimiento.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
            console.log(err),
            response.exito = false,
            response.msg = "Error al eliminar el movimiento"
            res.json(response)
            return;
        }
        
        response.exito = true,
        response.msg = "Movimiento eliminado correctamente"
        res.json(response)
    })
}
