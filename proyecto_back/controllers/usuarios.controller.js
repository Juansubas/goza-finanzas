const Usuario =  require("../models/usuarios.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

let response ={
    msg: "",
    exito: false
};

exports.login = function(req, res, next){

    let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");

    Usuario.findOne({ usuario: req.body.usuario, pass: hashedpass}, function(err, usuario){
        let response = {
            token: null
        }

        if(usuario !== null){
            response.token = jwt.sign({
                id: usuario._id,
                usuario: usuario.usuario
            }, "__recret__",
            { expiresIn: '12h'}
            )
        }
        res.json(response);
    })
}

exports.create = function(req,res){
    
    Usuario.findOne({usuario: req.body.usuario}, function(err, usuario){
        if(usuario !== null){
            response.exito = false;
            response.msg = "Usuario no disponible";
            return res.json(response);
        }
        creacion();
    })  

    function creacion() {
        let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");

        let usuario = new Usuario({
            usuario: req.body.usuario,
            pass: hashedpass
        });
    
        usuario.save(function(err){
            if(err){
                console.log = false,
                response.exito = false,
                response.msg ="Error al crear el Usuario"
                res.json(response)
                return;
            }
            
            response.exito = true;
            response.msg = "El usuario fue creado correctamente"
            res.json(response)
        })
    }



}