// --------------------MIDDLEWARES---------------------------//
const jwt = require('jsonwebtoken');
const tokenKey = 'asdfghjkl';


function validacionjwt(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        const verificarToken = jwt.verify(token, tokenKey);

        if (verificarToken) {
            req.infoToken = verificarToken;
            console.log('req.infoToken en jwt')
            console.log(req.infoToken)
            console.log('req.infoToken en jwt')
            return next();
        }
    } catch (error) {

        res.send(error)
    }
}


function validationJwtUser (req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const verificarToken = jwt.verify(token, tokenKey);
      if (verificarToken) {
        req.infoToken = verificarToken;
        console.log('req.infoToken en jwt')
            console.log(req.infoToken)
            console.log('req.infoToken en jwt')
        return next();
      }
    } catch (error) {
        console.log(error);
      res.status(400).json('Error en la validacion del usuario');
    }
  }


  function validateOrderData (req, res, next) {
    if (req.body.total && req.body.pay_method_id && req.body.items) {
      next();
    } else {
      res.status(400).json('Error, todos los campos deben estar completos');
    }
  }


  function validateProduct (req, res, next) {
    if (req.body.product_id && req.body.name && req.body.price && req.body.img_url) {
        next();
    } else {
        res.status(400).json('Error de validacion de producto');
    }
}


function validateAdminJWT(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        const verificarToken = jwt.verify(token, tokenKey);

        if (verificarToken) {
            req.infoToken = verificarToken;
            if (req.infoToken.admin == true) {
                console.log('req.infoToken en jwt')
                console.log(req.infoToken)
                console.log('req.infoToken en jwt')
                return next();
            } else {
                res.status(400).json('Error de validacion de token');
            }
        }
    } catch (error) {
        console.log('Error' + error);
        
    }
}




module.exports =  {validateAdminJWT, validacionjwt, validateOrderData, validationJwtUser, validateProduct};
